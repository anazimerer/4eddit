import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PostDetail from "../../Components/PostDetail/PostDetail";
import Header from "../../Components/Header/index";

export default function Post() {
  const [loading, setLoading] = useState(true);

  const postId = useParams();

  return (
    <div>
      <Header />
      <PostDetail id={postId.id} />
    </div>
  );
}
