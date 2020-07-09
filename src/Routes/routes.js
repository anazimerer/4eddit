import React from 'react'
import { Switch, Route , BrowserRouter } from 'react-router-dom'

import Login from '../Pages/LoginPage/index.js';
import Signup from '../Pages/Signup/index.js'
import Feed from '../Pages/FeedPage/index.js'
import Post from '../Pages/PostPage/index.js'

export default function Routes() {   
    return (
        <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Login}/> 
              <Route exact path="/signup" component={Signup}/>  
              <Route exact path="/feed" component={Feed}/>   
              <Route exact path="/posts/:id" component={Post}/>                
            </Switch>
        </BrowserRouter>
    );
  }
  