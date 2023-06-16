import styled from "styled-components";

export const StyledResults = styled.section`
  text-align: center;
  margin-top: 2rem;

  & > p:first-child {
    margin-top: 13vh;
  }

  svg {
    font-size: 100px;

    &.rotate {
      animation: spin-element infinite 2s linear;
    }
  }
`;

export const StyledUserCard = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  height: 27px;
  border-radius: 8px;
  height: 65px;
  background-color: #f5f5f5;
  margin-bottom: 20px;
  padding: 5px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.8s;
  text-decoration: none;
  color: var(--primary);

  &:hover {
    cursor: pointer;
    box-shadow: none;
  }

  img {
    width: 50px;
    height: auto;
    border-radius: 50%;
  }

  svg {
    position: absolute;
    top: 24px;
    right: 10px;
    font-size: 20px;
  }
`;
