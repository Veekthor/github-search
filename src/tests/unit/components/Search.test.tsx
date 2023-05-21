import renderer from "react-test-renderer";
import Search from "../../../components/Search";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { act, render, screen } from "@testing-library/react";
import { SearchedContext } from "../../../context/SearchContext";
import userEvent from "@testing-library/user-event";

const setLoading = jest.fn();
const setResult = jest.fn();

// Got idea for using context this way for https://polvara.me/posts/mocking-context-with-react-testing-library
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

  it("should call set methods", () => {
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
    expect(setLoading).toBeCalledTimes(1);
    // setTimeout(() => {
    //   expect(setResult).toBeCalled();
    //   expect(setLoading).toBeCalledTimes(2);
    //   console.log("Hey");
    // }, 3000)
  })
});
