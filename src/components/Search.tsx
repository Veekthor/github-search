// TODO: RUN SEARCH IF URL IS LOADED WITH SEARCH TERM
import { useContext, useState } from "react";
import { SearchedContext } from "../context/SearchContext";
import { IReturnedSearchCall } from "../interfaces";
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

  const runSearch = async (term: string, type:string): Promise<IReturnedSearchCall> => {
    const url = `https://api.github.com/search/users?q=${term}+type:${type}`
    const res = await fetch(url);
    const data = await res.json();
    return data;
  };

  const handleSearch = async () => {
    setLoading(true);
    setParams({ term: searchTerm, type: searchType });
    const response = await runSearch(searchTerm, searchType);
    setLoading(false);
    const fetchedData = response.items;
    setResult(fetchedData);
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
        data-testid="search-input"
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
        <button onClick={handleSearch} disabled={isLoading || !searchTerm.trim()}>
          Search
        </button>
      </SearchActions>
    </SearchContainer>
  );
};

export default Search;
