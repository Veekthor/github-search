import React, { createContext, useState } from "react";
import { GitHubUser, ISearchedContext, ISearchProvider } from "../interfaces";

export const SearchedContext = createContext<ISearchedContext>({
  result: null,
  setResult: () => {},
  isLoading: false,
  setLoading: () => {},
});

//I got the idea for the Context Provider wrapper from: https://felixgerschau.com/react-typescript-context/
export const SearchedProvider: React.FC<ISearchProvider> = ({ children }) => {
  const [result, setResult] = useState<GitHubUser[] | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  return (
    <SearchedContext.Provider
      value={{
        setResult,
        result,
        isLoading,
        setLoading,
      }}
    >
      {children}
    </SearchedContext.Provider>
  );
};
