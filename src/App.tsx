import React, { FC } from 'react';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { AppShell, Navbar, Header } from "@mantine/core";

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



const App:FC = () => {

  // MAIN APP STATE


  return (

    <Router>
    <AppShell
    padding="md"
    navbar={ <Navigation />}
    header={<Header height={60} p="xs">{/* Header content */}</Header>}
    styles={(theme) => ({
      main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
    })}
  >
 
  
    <ContextProvider>
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
    </ContextProvider>
    

    </AppShell>
    </Router>  
      );
}

export default App;
