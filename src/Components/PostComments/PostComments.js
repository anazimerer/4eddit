import React, { useState, useEffect } from "react";
import {
  Comment,
  CommentAuthorContainer,
  CommentFooter,
  CommentTextContainer,
} from "./styles";

function PostComments(props) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setComments(props.postComments);
  });
  return (
    <div>
      {comments &&
        comments.map((comment) => {
          return (
            <Comment>
              <CommentAuthorContainer>
                <p>{comment.username}</p>
              </CommentAuthorContainer>
              <CommentTextContainer>
                <p>{comment.text}</p>
              </CommentTextContainer>
              <CommentFooter>
                <p>{comment.votesCount}</p>
              </CommentFooter>
            </Comment>
          );
        })}
    </div>
  );
}

export default PostComments;
