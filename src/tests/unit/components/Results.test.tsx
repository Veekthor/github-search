import renderer from "react-test-renderer";
import Results from "../../../components/Results";
import {
  getAllByTestId,
  getByTestId,
  render,
  screen,
} from "@testing-library/react";
import { SearchedContext } from "../../../context/SearchContext";
import { GitHubUser } from "../../../interfaces";
import data from "../../../data";

const renderResultsWithContext = (result: GitHubUser[], isLoading: boolean) => {
  return render(
    <SearchedContext.Provider
      value={{
        result,
        isLoading,
        setLoading: jest.fn(),
        setResult: jest.fn(),
      }}
    >
      <Results />
    </SearchedContext.Provider>
  );
};

describe("Results tests", () => {
  let result: GitHubUser[] = [];
  it("should match snapshot", () => {
    const component = renderer.create(<Results />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should display loading icon", () => {
    renderResultsWithContext(result, true);
    expect(screen.getByTestId("loading-icon")).toBeInTheDocument();
  });

  it("should display Empty results view", () => {
    renderResultsWithContext(result, false);
    expect(screen.getByText(/No Results Found/i)).toBeInTheDocument();
  });

  it("should display results", () => {
    result = data.items;
    renderResultsWithContext(result, false);
    const elements = screen.getAllByTestId("user-card");
    expect(elements).toHaveLength(result.length);
    expect(screen.getAllByAltText(/avatar/i)).toHaveLength(result.length);
  });
});
