import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { PostFooter, ButtonVote } from "../PostDetail/styles";

import CountReducer from "../../Reducers/CountReducer";
import FiltersContext from "../../Context/FiltersContext";

const ContainerPost = styled.div`
  width: 30vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid black;
  margin: 10px;
  padding: 5px;
  div {
    display: flex;
    flex-direction: row;
    span {
      margin: 10px;
    }
  }
`

export default function Posts(props){
    const filtersContext = useContext(FiltersContext);
    const history = useHistory();

    const goToPostPage = (id) => {
        history.push(`/posts/${id}`);
    };

    let filteredPosts= props.allPosts
    
    if(filtersContext.filters.name !== null){
        filteredPosts = filteredPosts.filter((posts) => {
            return posts.username.toLowerCase().includes(filtersContext.filters.name.toLowerCase());
        })
    }
    if(filtersContext.filters.text !== null){
        filteredPosts = filteredPosts.filter((posts) => {
            return posts.text.toLowerCase().includes(filtersContext.filters.text.toLowerCase());
        })        
    }
	
    const listOfPosts = filteredPosts.map((posts) => {
        return (
          <ContainerPost key={posts.id}>
			<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>			  
            <h4>{posts.username}</h4>
			<hr />
            <p>{posts.text}</p>
			<hr />
            <PostFooter>
              <span>
                <CountReducer value={posts.votesCount} id={posts.id} />
              </span>
              <span>
                {posts.commentsCount} comentários
                <ButtonVote
                  onClick={() => {
                    goToPostPage(posts.id);
                  }}
                >
                  <i class="material-icons">chat_bubble</i>
                </ButtonVote>
              </span>
			  </PostFooter>
          </ContainerPost>
        );
      });
    return(
        <div>
            {listOfPosts}
        </div>
    )
}