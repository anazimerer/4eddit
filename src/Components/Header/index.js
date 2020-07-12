import React from "react";
import logo from "../../Assets/logo.PNG"
import { HeaderContainer, HeaderOption } from "./styles";
import { useHistory } from "react-router-dom";

export default function Header() {
  const history = useHistory();

  const logout = () => {
    window.localStorage.clear();
    history.push("/");
  };

  return (
    <div>
      <HeaderContainer>
        <img src={logo} alt="logo" />
        <HeaderOption onClick={logout}>Logout</HeaderOption>
      </HeaderContainer>
    </div>
  );
}
