import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import api from '../../Sevice/api';
import styled from 'styled-components'
import CountReducer from './CountReducer'

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
   const [form, setForm]=useState({inputNewPost: ''}) 
   const history= useHistory();

    useEffect(()=>{
        getAllPosts();
    }, [])

    const getAllPosts = ()=>{
        const axiosConfig={
            headers:{
                Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im5hN20zdUxoaERwZzg0dUtPY3BKIiwidXNlcm5hbWUiOiJncnVwbzUiLCJlbWFpbCI6ImdydXBvNUBnbWFpbC5jb20iLCJpYXQiOjE1OTQxMzg1MDh9.CthpTdlVAgfFHfkNYQTO8Gm_btSL3GWVDi8OPG_QaeQ"
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
            title: "Sou novo por aqui!",
            text: form.inputNewPost
        }
        const axiosConfig={
            headers:{
                Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im5hN20zdUxoaERwZzg0dUtPY3BKIiwidXNlcm5hbWUiOiJncnVwbzUiLCJlbWFpbCI6ImdydXBvNUBnbWFpbC5jb20iLCJpYXQiOjE1OTQxMzg1MDh9.CthpTdlVAgfFHfkNYQTO8Gm_btSL3GWVDi8OPG_QaeQ"
            }
        }
        api.
            post('/posts', body, axiosConfig)
            .then(()=>{
                alert('post criado')
                setForm({inputNewPost:''})
                getAllPosts();
            }).catch(()=>{
                alert('não postado')
            })
    }

    const handleInputNewPost=(event)=>{
        const {name,value}=event.target
        setForm({...form, [name]:value})
    }

    const goToPostPage = (id)=>{
        history.push(`/posts/${id}`)
    }
    //valores retornados pelo get posts
    //commentsCount: 22
    //createdAt: 1591973880700
    //id: "060ArFua9saK6pXR7xfO"
    //text: "teste"
    //title: "novo post"
    //userVoteDirection: 0
    //username: "Hendrix"
    //votesCount: 8

    const listOfPosts= post.map((posts)=>{
        return ( 
            <ContainerPost>
                <h4>{posts.username}</h4>
                <p>{posts.text}</p>
                <div>
                    <span>
                       <CountReducer value={posts.votesCount}/>
                    </span>
                    <span>
                        {posts.commentsCount}comentários
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
                    value={form.inputNewPost}
                    placeholder="Escreva algo"
                    onChange={handleInputNewPost}
                />
                <button onClick={onClickCreatePost}>postar</button>
            </section>
            <section>
               {listOfPosts}
            </section>
        </div>
    );
}

