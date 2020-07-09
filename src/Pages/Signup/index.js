import React from "react";
import {
  SignupPageContainer,
  SignupFormContainer,
  SignupButton,
  SignupInput,
  SignupHeadline,
  GoToLoginButton,
  ButtonContainer,
} from "./styles";
import useInputValue from "../../Hooks/useInputValue";
import api from "../../Sevice/api";
import { useHistory } from "react-router-dom";

export default function SignUp() {
  const [username, handleChangeUsername] = useInputValue("");
  const [email, handleChangeEmail] = useInputValue("");
  const [password, handleChangePassword] = useInputValue("");
  const history = useHistory();

  const onSubmitForm = (event) => {
    event.preventDefault();
    const body = {
      username: username,
      email: email,
      password: password,
    };
    api
      .post("/signup", body)
      .then((response) => {
        console.log(response);
        history.push('/feed')	
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const goToLoginPage = () => {
    history.push("/");
  };

  return (
    <SignupPageContainer>
      <SignupHeadline>Faça seu cadastro</SignupHeadline>
      <SignupFormContainer>
        <form onSubmit={onSubmitForm}>
          <p>Nome de usuário:</p>
          <SignupInput
            value={username}
            name="username"
            onChange={handleChangeUsername}
            pattern="{5,}"
            title="Digite no mínimo 5 caracteres"
          />
          <p>Email:</p>
          <SignupInput
            value={email}
            name="email"
            onChange={handleChangeEmail}
            type="email"
            title="Digite um email válido"
          />
          <p>Senha:</p>
          <SignupInput
            value={password}
            name="password"
            onChange={handleChangePassword}
            pattern="{6,}"
            type="password"
          />
          <ButtonContainer>
            <SignupButton>Cadastrar</SignupButton>
            <GoToLoginButton onClick={goToLoginPage}>
              Já possuo conta
            </GoToLoginButton>
          </ButtonContainer>
        </form>
      </SignupFormContainer>
    </SignupPageContainer>
  );
}
