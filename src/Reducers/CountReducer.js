import React, { useReducer, useEffect, useState } from "react";
import api from "../Sevice/api";

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
   const [token]=useState(localStorage.getItem('token'))
  const [state, dispatch] = useReducer(reducer, initialState);
  const [vote, setVote] = useState(0);

  const addLike = () => {
    if (vote === 0 || vote === -1) {
      setVote(1);
      const body = {
        direction: 1,
      };
      const axiosConfig = {
        headers: {
          Authorization: token
        },
      };
      api
        .put(`/posts/${props.id}/vote`, body, axiosConfig)
        .then(() => {
          alert("voto computado");
          dispatch({ type: "LIKE" });
        })
        .catch((error) => {
          console.log(error);
          alert("não votouu");
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
          Authorization: token
        },
      };

      api
        .put(`/posts/${props.id}/vote`, body, axiosConfig)
        .then(() => {
          alert("votouu negativo");
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
      <button onClick={addLike}>+</button>
      <span>{totalOfLikes}</span>
      <button onClick={removeLike}>-</button>
    </div>
  );
}
