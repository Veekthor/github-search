import styled from "styled-components";

export const SearchInput = styled.input`
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  padding: 10px;
`;

export const SearchActions = styled.div`
  display: flex;
  margin-top: 15px;
  gap: 10px;

  button {
    border: 1px solid var(--primary);
    cursor: pointer;
    background-color: white;
    padding: 0.2rem 1.5rem;
    transition: background-color 0.8s, color 0.8s;

    &:hover {
      background-color: var(--primary);
      color: white;
    }

    &:disabled {
      opacity: 0.3;
      pointer-events: none;
    }
  }
`;
