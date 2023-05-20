import React from "react";
import Header from "./components/Header";
import Results from "./components/Results";
import Search from "./components/Search";
import { Container } from "./components/styles/Container.styled";
import GlobalStyles from "./components/styles/Global.styled";
import { SearchedProvider } from "./context/SearchContext";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Container>
        <SearchedProvider>
          <Router>
            <Routes>
              <Route
                path="/search"
                element={
                  <>
                    <Search />
                    <Results />
                  </>
                }
              />
              <Route path="/" element={<Navigate to="/search" />} />
            </Routes>
          </Router>
        </SearchedProvider>
      </Container>
    </>
  );
};

export default App;
