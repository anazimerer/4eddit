import React, { useEffect, useState, useReducer} from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import api from "../../Sevice/api";
import Filters from "../../Components/Filters";
import Posts from '../../Components/Posts/index'

import useInputValue from "../../Hooks/useInputValue";
import FiltersReducer, { initialState } from "../../Reducers/FiltersReducer";
import FiltersContext from "../../Context/FiltersContext";
import ReactLoading from "react-loading";

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const ContainerFeed = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;  
`
const SectionCreatePost=styled.section`
	display: flex;
	justify-content: flex-end;
	flex-direction: column;
	margin: 10px;
	input{
		width: 30vw;
		height: 15vh;
		border-radius: 5px;
	}
	button{
		width: 100%;		
	}
  
`
const ContainerFilter=styled.div`
	display: flex;
	border-radius: 2.5px;
	width: 30vw;
	height: 5vh;
	margin: 5px;
	input{
		width: 45%;
	} 
	button{
		position: center;
	}
`
export default function FeedPage() {
  	const [
  	  inputNewPost,
  	  handleChangeInputNewPost,
  	  clearNewPostInput,
	] = useInputValue("");
	
  	const [state, dispatch] = useReducer(
  	  FiltersReducer,
  	  initialState
  	);

  	const [token, setToken] = useState();
  	const [post, setPost] = useState([]);
  	const [loading, setLoading] = useState(true);
  	const history = useHistory();

  	useEffect(() => {
  	  getAllPosts();
  	  setToken(localStorage.getItem("token"));
  	  if (token === null) {
  	    alert("Indique um email e senha para continuar");
  	    history.push("/");
  	  }
  	}, [token]);

  	const getAllPosts = () => {
  	  	const axiosConfig = {
  	  	  headers: {
  	  	    Authorization: token,
  	  	  },
  	  	};
  	  	api.get("/posts", axiosConfig).then((response) => {
  	  	  setPost(response.data.posts);
  	  	  setLoading(false);
  	  	});
  	};

  	const onClickCreatePost = () => {
    	const body = {
    	  title: inputNewPost,
    	  text: inputNewPost,
    	};
    	const axiosConfig = {
    	  headers: {
    	    Authorization: token,
    	  },
    	};
    	api
    	  .post("/posts", body, axiosConfig)
    	  .then(() => {
    	    alert("post criado");
    	    clearNewPostInput(inputNewPost);
    	    getAllPosts();
    	  })
    	  .catch(() => {
    	    alert("não postado");
    	  });
	};

 	const render = loading ? (
 	    <LoadingContainer>
 			<ReactLoading type="spokes" color="blue" />
 	    </LoadingContainer>
 	 	) : (
 	    <FiltersContext.Provider
		  value={{ filters: state.filters, dispatch: dispatch }}>
      		<ContainerFeed>
			  	<ContainerFilter>
      		  	  	<Filters />
      		  	</ContainerFilter>
      		  	<SectionCreatePost>
      		  	  	<input
      		  	    	type="text"
      		  	    	name="inputNewPost"
      		  	    	value={inputNewPost}
      		  	    	placeholder="O que está acontecendo?"
      		  	    	onChange={handleChangeInputNewPost}
      		  	  	/>
      		  		<button onClick={onClickCreatePost}>PUBLICAR</button>
      		  	</SectionCreatePost>
				<Posts allPosts={post}/>
      		</ContainerFeed>
    	</FiltersContext.Provider>
  	);
    return <div>{render}</div>;
}
