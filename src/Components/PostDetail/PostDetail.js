import React from "react";
import {
  PostContainer,
  PostPageContainer,
  MainPost,
  PostAuthor,
  PostAuthorContainer,
  PostFooter,
  PostComment,
  CommentTextArea,
  CommentInPostContainer,
} from "./styles";
import PostComments from "../PostComments/PostComments.js";

function PostDetail(props) {
  return (
    <div>
      <PostPageContainer>
        <PostContainer>
          <MainPost>
            <PostAuthorContainer>
              <PostAuthor>@LourençoPassos</PostAuthor>
            </PostAuthorContainer>
            <PostFooter>
              <p>Comentários</p>
            </PostFooter>
          </MainPost>
        </PostContainer>
        <CommentInPostContainer>
          <CommentTextArea />
          <button>Comentar</button>
        </CommentInPostContainer>
        <PostComments></PostComments>
      </PostPageContainer>
    </div>
  );
}

export default PostDetail;
