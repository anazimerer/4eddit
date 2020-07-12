import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
  height: 5vw;
  text-align: right;
  width: 100%;
  background-color: #092c5c;
  img{
    margin-left: 20px;
  }
`;

export const HeaderOption = styled.p`
  margin: 20px 35px;
  font-size: 2.5vh;
  color: white;
  cursor: pointer;
  &:hover {
    font-weight: bold;
  }
`;

