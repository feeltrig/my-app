import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { AppShell, Drawer } from "@mantine/core";

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
import Errorpage from './components/errorpage';

// USESTATE HOOK TYPE
export type openedTYPE = [
  opened:boolean,
  setopened: Dispatch<SetStateAction<boolean>>
];


const App:FC = () => {

  // MAIN APP STATE
  const [opened, setopened]:openedTYPE = useState<boolean>(true)


  return (
     
    <ContextProvider>
      
      <Drawer onClose={() => {setopened(false)}} opened={opened} title="Menu" position='left' size='full'>

      </Drawer>

    <Router>
    <AppShell
    padding="md"
    
    navbar={ <Navigation/>}
    header={<HeaderComponent setopened={setopened} />}
    
    styles={(theme) => ({
      main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[1]
    },
    })}
  >
    <div className="App"> 
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="login" element={<Login/>} />
          <Route path="signin" element={<Signin/>} />
         
          <Route path='*' element={<Errorpage /> } />
        </Routes>    
    </div>
    </AppShell>
    </Router>  
    </ContextProvider>
  );
}

export default App;
