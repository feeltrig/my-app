import React, { FC } from 'react';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import './App.css';

// COMPONENTS IMPORTS
import Home from "./components/home";
import Navigation from './components/navigation';

import Signin from './components/signin';
import Login from './components/login';

import Passwords from './components/passwords/passwords';
import CreatePassword from './components/passwords/createPassword';
import PasswordDisplay from './components/passwords/passwordDisplay';

// CONTEXT IMPORTS
import { appContext, appState } from "./AppState/appstate";

const App:FC = () => {

  return (
    <appContext.Provider value={appState}>
    <div className="App">
      <Router>
        <Navigation/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="login" element={<Login/>} />
          <Route path="signin" element={<Signin/>} />
          <Route path="passwords" element={<Passwords/>}>
            <Route path='createpassword' element={<CreatePassword /> } /> 
            <Route path='passwordDisplay' element={<PasswordDisplay />} /> 
          </Route>
        </Routes>
      </Router>    
    </div>
    </appContext.Provider>
      );
}

export default App;
