import styled from "styled-components";

export const PostContainer = styled.div``;

export const PostPageContainer = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const MainPost = styled.div`
  width: 35vw;
  height: 35vh;
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const PostAuthorContainer = styled.div`
  border-bottom: 1px solid black;
  width: 35vw;
  display: flex;
  justify-content: center;
  border-radius: 5px;
`;

export const PostAuthor = styled.p``;

export const PostFooter = styled.div`
  border-top: 1px solid black;
  width: 100%;
  display: flex;
  justify-content: center;
  border-radius: 5px;
`;

export const ButtonVote =styled.a`
  margin: 5px;
  width: 30px;
  height: 30px;
  :hover{
    color: #3b88c3;
  }
`
export const CommentTextArea = styled.textarea`
  width: 20vw;
  margin: 0 10px 0 0;
`;

export const CommentInPostContainer = styled.div`
  margin: 10px 0 20px 0;
  border: 1px solid black;
  width: 35vw;
  height: 8vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
`;

export const PostTextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;
export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

export const ReturnButtonContainer = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export const ReturnButton = styled.button`
  margin-top: 20px;
`;
