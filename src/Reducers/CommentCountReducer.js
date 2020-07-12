import React, { useReducer, useEffect, useState } from "react";
import api from "../Sevice/api";
import { ButtonVote } from "../Components/PostDetail/styles";

const initialState = {
  count: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "LIKE":
      return { count: state.count + 1 };
    case "UNLIKE":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

export default function CountReducer(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [vote, setVote] = useState(0);
  const [token] = useState(localStorage.getItem("token"));

  const addLike = () => {
    if (vote === 0 || vote === -1) {
      setVote(1);
      const body = {
        direction: 1,
      };
      const axiosConfig = {
        headers: {
          Authorization: token,
        },
      };
      api
        .put(
          `/posts/${props.postId}/comment/${props.commentId}/vote`,
          body,
          axiosConfig
        )
        .then(() => {
          dispatch({ type: "LIKE" });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("só pode dar um like");
    }
  };

  const removeLike = () => {
    if (vote === 0 || vote === 1) {
      setVote(-1);
      const body = {
        direction: -1,
      };
      const axiosConfig = {
        headers: {
          Authorization: token,
        },
      };

      api
        .put(
          `/posts/${props.postId}/comment/${props.commentid}/vote`,
          body,
          axiosConfig
        )
        .then(() => {
          dispatch({ type: "UNLIKE" });
        })
        .catch(() => {
          alert("não votouu");
        });
    } else {
      alert("você só pode descurtir uma vez");
    }
  };

  const totalOfLikes = props.value + state.count;

  return (
    <div>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
      <ButtonVote onClick={addLike}><i class="small material-icons">arrow_upward</i></ButtonVote>
      <span>{totalOfLikes}</span>
      <ButtonVote onClick={removeLike}><i class="material-icons">arrow_downward</i></ButtonVote>
    </div>
  );
}
