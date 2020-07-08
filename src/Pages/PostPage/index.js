import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PostDetail from "../../Components/PostDetail/PostDetail";

export default function Post() {

  const postId  = useParams();

  return (
    <div>
      <PostDetail id={postId.id}/>
    </div>
  );
}
