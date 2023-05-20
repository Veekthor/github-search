import React from "react";
import { Logo, StyledHeader } from "./styles/Header.styled";
import GitHubIcon from "../assets/images/github.svg";

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <Logo src={GitHubIcon} alt="logo" />
      Search Github
    </StyledHeader>
  );
};

export default Header;
