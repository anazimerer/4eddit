import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import api from '../../Sevice/api';
import styled from 'styled-components'
import CountReducer from '../../Reducers/CountReducer'
import useInputValue from "../../Hooks/useInputValue";

const ContainerPost = styled.div`
    border: 1px solid black;
    width: 25vw;
    margin: 5px;
    div{
        display: flex;
        flex-direction: row;
        span{
            margin: 10px;
        }
    }
`

export default function FeedPage(){  
   const [post, setPost]=useState([])
   const [inputNewPost, handleChangeInputNewPost, clearNewPostInput] = useInputValue("");
   const [token, setToken]=useState()
   const history= useHistory();

    useEffect(()=>{
        getAllPosts();
        setToken(localStorage.getItem('token'))    
        if (token === null){
            alert('Indique um email e senha para continuar')
            history.push('/')
        } 
    }, [token])

    const getAllPosts = ()=>{
        const axiosConfig={
            headers:{
                Authorization: token
            }
        }
        api
            .get('/posts', axiosConfig)
            .then((response)=>{
                setPost(response.data.posts)
            })
    }

    const onClickCreatePost=()=>{
        const body={
            title: inputNewPost,
            text: inputNewPost
        }
        const axiosConfig={
            headers:{
                Authorization: token
            }
        }
        api.
            post('/posts', body, axiosConfig)
            .then(()=>{
                alert('post criado')
                clearNewPostInput(inputNewPost)
                getAllPosts();
            }).catch(()=>{
                alert('não postado')
            })
    }


    const goToPostPage = (id)=>{
        history.push(`/posts/${id}`)
    }

    const listOfPosts= post.map((posts)=>{
        return ( 
            <ContainerPost>
                <h4>{posts.username}</h4>
                <p>{posts.text}</p>
                <div>
                    <span>
                       <CountReducer value={posts.votesCount} id={posts.id}/>
                    </span>
                    <span>
                        {posts.commentsCount} comentários
                        <button onClick={() => {goToPostPage(posts.id)}}>ver comentários</button>
                    </span>
                </div>               
            </ContainerPost>
        );        
    })

    return(
        <div>
            FeedPage
            <section>
                Create post 
                <input 
                    type="text"
                    name="inputNewPost"
                    value={inputNewPost}
                    placeholder="Escreva algo"
                    onChange={handleChangeInputNewPost}
                />
                <button onClick={onClickCreatePost}>postar</button>
            </section>
            <section>
               {listOfPosts}
            </section>
        </div>
    );
}

