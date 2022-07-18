import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { AppShell, Drawer, Header } from "@mantine/core";

import './App.css';

// COMPONENTS IMPORTS
import Home from "./components/home";
import Navigation from './components/navigation';

import Signin from './components/signin';
import Login from './components/login';


// CONTEXT IMPORTS
import { ContextProvider } from "./AppState/appstate";
import HeaderComponent from './components/Header';
import Errorpage from './components/errorpage';
import ProtectedRoutes from './components/protectedRoutes';
import MobileNav from './components/mobileNav';


// USESTATE HOOK TYPE
export type openedTYPE = [
  opened:boolean,
  setopened: Dispatch<SetStateAction<boolean>>
];


const App:FC = () => {

  // MAIN APP STATE
  const [opened, setopened]:openedTYPE = useState<boolean>(false)
  
  return ( 
    <ContextProvider>
    <Router>
    <AppShell
    padding="md"

    
    
    navbar={ <Navigation  opened={opened} setopened={setopened}  />}
    header={<HeaderComponent  setopened={setopened} />}
    
    styles={(theme) => ({
      main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[1],
      
    },body:{ height:'calc(100vh - 3rem)' }
    })}
  >
    <div className="App"> 
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="login" element={<Login/>} />
          <Route path="signin" element={<Signin/>} />
          <Route path='/user/*' element={<ProtectedRoutes /> } />
         
          <Route path='*' element={<Errorpage /> } />
        </Routes>    
    </div>
    </AppShell>
    </Router>  
    </ContextProvider>
  );
}

export default App;
