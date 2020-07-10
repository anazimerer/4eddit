import React, { useEffect, useState, useReducer } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import api from "../../Sevice/api";
import Filters from "../../Components/Filters";
import useInputValue from "../../Hooks/useInputValue";

import CountReducer from "../../Reducers/CountReducer";
import FiltersReducer, { initialState } from "../../Reducers/FiltersReducer";
import FiltersContext from "../../Context/FiltersContext";
import ReactLoading from "react-loading";

const ContainerPost = styled.div`
  border: 1px solid black;
  width: 25vw;
  margin: 5px;
  div {
    display: flex;
    flex-direction: row;
    span {
      margin: 10px;
    }
  }
`;

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
  const [filtersState, filtersDispatch] = useReducer(
    FiltersReducer,
    initialState
  );
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

  const goToPostPage = (id) => {
    history.push(`/posts/${id}`);
  };

  const listOfPosts = post.map((posts) => {
    return (
      <ContainerPost key={posts.id}>
        <h4>{posts.username}</h4>
        <p>{posts.text}</p>
        <div>
          <span>
            <CountReducer value={posts.votesCount} id={posts.id} />
          </span>
          <span>
            {posts.commentsCount} comentários
            <button
              onClick={() => {
                goToPostPage(posts.id);
              }}
            >
              ver comentários
            </button>
          </span>
        </div>
      </ContainerPost>
    );
  });

  const render = loading ? (
    <LoadingContainer>
      <ReactLoading type="spokes" color="blue" />
    </LoadingContainer>
  ) : (
    <FiltersContext.Provider
      value={{ filters: filtersState, dispatch: filtersDispatch }}
    >
      <div>
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
        <section>{listOfPosts}</section>
      </div>
    </FiltersContext.Provider>
  );

  return <div>{render}</div>;
}
