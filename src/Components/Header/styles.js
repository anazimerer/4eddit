import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  border: 1px solid black;
  height: 5vw;
  text-align: right;
`;

export const HeaderOption = styled.p`
  margin: 20px 15px;
  font-size: 2.5vh;
  cursor: pointer;
  &:hover {
    font-weight: bold;
  }
`;

