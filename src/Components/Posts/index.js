import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import CountReducer from "../../Reducers/CountReducer";
import FiltersContext from "../../Context/FiltersContext";

const ContainerPost = styled.div`
  border: 1px solid black;
  width: 25vw;
  margin: 5px;
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
            <h4>{posts.username}</h4>
            <p>{posts.text}</p>
            <div>
              <span>
                <CountReducer value={posts.votesCount} id={posts.id} />
              </span>
              <span>
                {posts.commentsCount} comentários
                <button
                  onClick={() => {
                    goToPostPage(posts.id);
                  }}
                >
                  ver comentários
                </button>
              </span>
            </div>
          </ContainerPost>
        );
      });
    return(
        <div>
            {listOfPosts}
        </div>
    )
}