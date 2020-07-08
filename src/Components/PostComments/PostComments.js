import React from "react";
import { Comment, CommentAuthorContainer, CommentFooter } from "./styles";

function PostComments(props) {
  return (
    <div>
      <Comment>
        <CommentAuthorContainer>
          <p>@JoãoSilva</p>
        </CommentAuthorContainer>
        <CommentFooter>
          <p>Comentários</p>
        </CommentFooter>
      </Comment>
    </div>
  );
}

export default PostComments;
