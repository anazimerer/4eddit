import React, { useEffect, useState, useReducer } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import api from "../../Sevice/api";
import Filters from "../../Components/Filters";
import Posts from "../../Components/Posts/index";
import Header from "../../Components/Header/index";
import useInputValue from "../../Hooks/useInputValue";

import FiltersReducer, { initialState } from "../../Reducers/FiltersReducer";
import FiltersContext from "../../Context/FiltersContext";
import ReactLoading from "react-loading";

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

export default function FeedPage() {
  const [
    inputNewPost,
    handleChangeInputNewPost,
    clearNewPostInput,
  ] = useInputValue("");
  const [state, dispatch] = useReducer(FiltersReducer, initialState);

  const [token, setToken] = useState();
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    getAllPosts();
    setToken(localStorage.getItem("token"));
    if (token === null) {
      alert("Indique um email e senha para continuar");
      history.push("/");
    }
  }, [token]);

  const getAllPosts = () => {
    const axiosConfig = {
      headers: {
        Authorization: token,
      },
    };
    api.get("/posts", axiosConfig).then((response) => {
      setPost(response.data.posts);
      setLoading(false);
    });
  };

  const onClickCreatePost = () => {
    const body = {
      title: inputNewPost,
      text: inputNewPost,
    };
    const axiosConfig = {
      headers: {
        Authorization: token,
      },
    };
    api
      .post("/posts", body, axiosConfig)
      .then(() => {
        alert("post criado");
        clearNewPostInput(inputNewPost);
        getAllPosts();
      })
      .catch(() => {
        alert("não postado");
      });
  };

  const render = loading ? (
    <LoadingContainer>
      <ReactLoading type="spokes" color="blue" />
    </LoadingContainer>
  ) : (
    <FiltersContext.Provider
      value={{ filters: state.filters, dispatch: dispatch }}
    >
      <div>
        <Header />
        FeedPage
        <section>
          Criar Post:
          <input
            type="text"
            name="inputNewPost"
            value={inputNewPost}
            placeholder="Escreva algo"
            onChange={handleChangeInputNewPost}
          />
          <button onClick={onClickCreatePost}>postar</button>
        </section>
        <div>
          <Filters />
        </div>
        <Posts allPosts={post} />
      </div>
    </FiltersContext.Provider>
  );

  return <div>{render}</div>;
}
