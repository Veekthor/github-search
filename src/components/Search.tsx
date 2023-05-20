// TODO: RUN SEARCH IF URL IS LOADED WITH SEARCH TERM
import { useContext, useState } from "react";
import { SearchedContext } from "../context/SearchContext";
import data from "../data";
import { GitHubUser } from "../interfaces";
import {
  SearchActions,
  SearchContainer,
  SearchInput,
} from "./styles/Search.styled";
import { useSearchParams } from "react-router-dom";

const Search: React.FC = () => {
  const [searchTerm, setTerm] = useState<string>("");
  const [searchType, setType] = useState<string>("user");
  const { setResult, isLoading, setLoading } = useContext(SearchedContext);
  const [params, setParams] = useSearchParams();

  const handleSearch = () => {
    setLoading(true);
    setParams({ term: searchTerm, type: searchType });
    console.log(params);
    setTimeout(() => {
      const fetchedData: GitHubUser[] = data.items;
      setLoading(false);
      setResult(fetchedData);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    if (name === "search") setTerm(value);
    if (name === "searchType") setType(value);
  };
  return (
    <SearchContainer>
      <SearchInput
        type="text"
        name="search"
        value={searchTerm}
        onChange={handleChange}
      />
      <SearchActions>
        <div>
          <input
            type="radio"
            id="user"
            name="searchType"
            value="user"
            checked={searchType === "user"}
            onChange={handleChange}
          />
          <label htmlFor="user">User</label>
        </div>
        <div>
          <input
            type="radio"
            id="org"
            name="searchType"
            value="org"
            checked={searchType === "org"}
            onChange={handleChange}
          />
          <label htmlFor="org">Org</label>
        </div>
        <button onClick={handleSearch} disabled={isLoading}>
          Search
        </button>
      </SearchActions>
    </SearchContainer>
  );
};

export default Search;
