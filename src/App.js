import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes/routes.js';
import Header from './Components/Header/index.js';

export default function App() {     
  return (
      <BrowserRouter> 
      <Header />          
      <Routes />  
          
      </BrowserRouter>
  );
}


