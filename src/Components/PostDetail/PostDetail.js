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
  LoadingContainer,
  ReturnButtonContainer,
  ReturnButton,
} from "./styles";
import PostComments from "../PostComments/PostComments.js";
import api from "../../Sevice/api";
import { useHistory } from "react-router-dom";
import ReactLoading from "react-loading";

function PostDetail(props) {
  const [postDetail, setPostDetail] = useState({});
  const [postDetailCommentNumber, setPostDetailCommentNumber] = useState("");
  const [commentText, setCommentText] = useState("");
  const [token, setToken] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const returnToFeedPage = () => {
    history.push("/feed");
  };

  const fetchPostDetails = () => {
    api
      .get(`/posts/${props.id}`, axiosConfig)
      .then((response) => {
        setPostDetail(response.data.post);
        setPostDetailCommentNumber(response.data.post.comments.length);
        setLoading(false);
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
  const render = loading ? (
    <LoadingContainer>
      <ReactLoading type="spokes" color="blue" />
    </LoadingContainer>
  ) : (
    <div>
      <PostPageContainer>
        <ReturnButtonContainer>
          <ReturnButton onClick={returnToFeedPage}>Voltar</ReturnButton>
        </ReturnButtonContainer>
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
          <button onClick={createComment}>COMENTAR</button>
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
  return <div>{render}</div>;
}

export default PostDetail;
