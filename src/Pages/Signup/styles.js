import styled from "styled-components";

export const SignupPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SignupFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30vw;
  justify-content: center;
  align-items: center;
`;

export const SignupButton = styled.button`
  margin-top: 10px;
  margin-right: 20px;
`;
export const GoToLoginButton = styled.button`
  margin-top: 10px;
`;

export const SignupInput = styled.input`
  width: 20vw;
`;

export const SignupHeadline = styled.h1`
  margin-bottom: 10px;
  font-size: 2.5vw;
`;

export const ButtonContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 15px;
  button{
    height: 5vh;
  }
`;
