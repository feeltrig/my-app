import React, { FC } from 'react';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { AppShell } from "@mantine/core";

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
import { ContextProvider } from "./AppState/appstate";
import HeaderComponent from './components/Header';



const App:FC = () => {

  // MAIN APP STATE


  return (
     
    <ContextProvider>

    <Router>
    <AppShell
    padding="md"
    
    navbar={ <Navigation />}
    header={<HeaderComponent/>}
    
    styles={(theme) => ({
      main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[1],
      minHeight:"100vh"
    },
    })}
  >
    <div className="App"> 
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="login" element={<Login/>} />
          <Route path="signin" element={<Signin/>} />
          <Route path="passwords" element={<Passwords/>}>
            <Route path='createpassword' element={<CreatePassword /> } /> 
            <Route path='passwordDisplay' element={<PasswordDisplay />} /> 
          </Route>
        </Routes>    
    </div>
    </AppShell>
    </Router>  
    </ContextProvider>
  );
}

export default App;
