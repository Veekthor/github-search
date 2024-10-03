// TODO: RUN SEARCH IF URL IS LOADED WITH SEARCH TERM
import { useContext, useEffect, useState } from "react";
import { SearchedContext } from "../context/SearchContext";
import { IReturnedSearchCall } from "../interfaces";
import {
  SearchActions,
  SearchButton,
  SearchInput,
} from "./styles/Search.styled";
import { useSearchParams } from "react-router-dom";

const Search: React.FC = () => {
  const [searchTerm, setTerm] = useState<string>("");
  const [searchType, setType] = useState<string>("user");
  const { setResult, isLoading, setLoading } = useContext(SearchedContext);
  const [params, setParams] = useSearchParams();

  const runSearch = async (
    term: string,
    type: string,
  ): Promise<IReturnedSearchCall> => {
    const url = `https://api.github.com/search/users?q=${term}+type:${type}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  };

  const handleSearch = async (term: string, type: string) => {
    const response = await runSearch(term, type);
    setLoading(false);
    const fetchedData = response.items;
    setResult(fetchedData);
  };

  useEffect(() => {
    const term = params.get("term");
    const type = params.get("type");
    if (!term) return;
    setTerm(term);
    if (type) setType(type);
    setLoading(true);
    handleSearch(term, type || "user");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = async () => {
    setLoading(true);
    setParams({ term: searchTerm, type: searchType });
    handleSearch(searchTerm, searchType);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    if (name === "search") setTerm(value);
    if (name === "searchType") setType(value);
  };
  return (
    <section>
      <SearchInput
        type="text"
        name="search"
        value={searchTerm}
        onChange={handleChange}
        data-testid="search-input"
        aria-label="Search"
        placeholder="Enter search term"
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
        <SearchButton
          onClick={handleClick}
          className={`${isLoading || !searchTerm.trim() ? "disabled" : ""}`}
        >
          Search
        </SearchButton>
      </SearchActions>
    </section>
  );
};

export default Search;
