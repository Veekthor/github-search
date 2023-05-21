import renderer from "react-test-renderer";
import Search from "../../components/Search";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { act, render, screen, waitFor } from "@testing-library/react";
import { SearchedContext } from "../../context/SearchContext";
import userEvent from "@testing-library/user-event";
import fetchedUsersObj from "../fixtures/data";

const setLoading = jest.fn();
const setResult = jest.fn();

// Got idea for using context this way from https://polvara.me/posts/mocking-context-with-react-testing-library
const renderSearchWithContext = (isLoading: boolean) => {
  return render(
    <SearchedContext.Provider
      value={{
        result: [],
        isLoading,
        setLoading,
        setResult,
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Search />} />
        </Routes>
      </Router>
    </SearchedContext.Provider>
  );
};

describe("Search tests", () => {
  it("should match snapshot", () => {
    const component = renderer.create(
      <Router>
        <Routes>
          <Route path="/" element={<Search />} />
        </Routes>
      </Router>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render all inputs in correct original state", () => {
    renderSearchWithContext(false);
    expect(screen.getByTestId("search-input")).not.toHaveValue();
    expect(screen.getByLabelText("User")).toBeChecked();
    expect(screen.getByLabelText("Org")).not.toBeChecked();
    expect(screen.getByText("Search")).toBeDisabled();
  });

  it("should disable only search button if in loading state", () => {
    renderSearchWithContext(true);
    const button = screen.getByText("Search");
    expect(button).toBeDisabled();
    expect(screen.getByTestId("search-input")).not.toBeDisabled();
    expect(screen.getByLabelText("User")).not.toBeDisabled();
    expect(screen.getByLabelText("Org")).not.toBeDisabled();
  });

  it("should correctly make API call and set states", async () => {
    fetchMock.resetMocks();
    const responseBody = fetchedUsersObj;
    fetchMock.mockResponseOnce(JSON.stringify(responseBody));
    act(() => {
      renderSearchWithContext(false);
    })
    expect(screen.getByText("Search")).toBeDisabled();
    const input = screen.getByTestId("search-input");
    act(() => {
      userEvent.type(input, "veek");
    })
    expect(screen.getByText("Search")).not.toBeDisabled();
    act(() => {
      userEvent.click(screen.getByText("Search"));
    })

    await waitFor(() => expect(setResult).toHaveBeenCalledTimes(1));
    expect(setLoading).toBeCalledTimes(2);
    expect(fetch).toBeCalledWith('https://api.github.com/search/users?q=veek+type:user')
    expect(setResult).toBeCalledWith(responseBody.items);
  })

  // TO DO: write test for api failures
});
