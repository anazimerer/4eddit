import React, { useState, useEffect } from "react";
import {
  PostContainer,
  PostPageContainer,
  MainPost,
  PostAuthor,
  PostAuthorContainer,
  PostFooter,
  PostTextContainer,
  CommentTextArea,
  CommentInPostContainer,
} from "./styles";
import PostComments from "../PostComments/PostComments.js";
import axios from "axios";
import api from "../../Sevice/api";
import { useHistory } from "react-router-dom";

function PostDetail(props) {
  const [postDetail, setPostDetail] = useState({});
  const [postDetailCommentNumber, setPostDetailCommentNumber] = useState("");
  const [commentText, setCommentText] = useState("");
  const [token, setToken] = useState([]);
  const history = useHistory();

  const createComment = () => {
    const body = {
      text: commentText,
    };

    api
      .post(`/posts/${props.id}/comment`, body, axiosConfig)
      .then((response) => {
        console.log(response);
        setCommentText("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const axiosConfig = {
    headers: {
      Authorization: token,
    },
  };

  const fetchPostDetails = () => {
    api
      .get(`/posts/${props.id}`, axiosConfig)
      .then((response) => {
        setPostDetail(response.data.post);
        setPostDetailCommentNumber(response.data.post.comments.length);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchPostDetails();
    setToken(localStorage.getItem("token"));
    if (token === null) {
      alert("Login necessário!");
      history.push("/");
    }
  });

  const handleCommentTextArea = (event) => {
    setCommentText(event.target.value);
  };

  let plural = Number(postDetailCommentNumber);

  const commentsPlural =
    plural <= 1 ? <span> Comentário </span> : <span> Comentários </span>;

  const comments =
    postDetailCommentNumber >= 1 ? (
      <p>
        {postDetailCommentNumber} {commentsPlural}
      </p>
    ) : (
      <p>Seja o primeiro a comentar!</p>
    );

  return (
    <div>
      <PostPageContainer>
        <PostContainer>
          <MainPost>
            <PostAuthorContainer>
              <PostAuthor>@{postDetail.username}</PostAuthor>
            </PostAuthorContainer>
            <PostTextContainer>
              <p>{postDetail.text}</p>
            </PostTextContainer>
            <PostFooter>{postDetail && comments}</PostFooter>
          </MainPost>
        </PostContainer>
        <CommentInPostContainer>
          <CommentTextArea
            value={commentText}
            onChange={handleCommentTextArea}
          />
          <button onClick={createComment}>Comentar</button>
        </CommentInPostContainer>
        <h3>
          {postDetailCommentNumber}
          {commentsPlural}
        </h3>
        <PostComments
          postComments={postDetail.comments}
          postId={postDetail.id}
        />
      </PostPageContainer>
    </div>
  );
}

export default PostDetail;
