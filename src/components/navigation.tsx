import { Navbar , Stack, Button, MediaQuery} from '@mantine/core';
import React , {Dispatch, FC, SetStateAction, useEffect, useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useMainApp } from '../AppState/appstate';

// TYPE IMPORTS
import { appStateTYPE } from "../AppState/appstate";

// DEFAULT APP STATE IMPORT
import { appState } from "../AppState/appstate";
import { NavigationTYPE } from '../Types/navigationTYPE';
import MobileNav from './mobileNav';
import NavbarComp from './NavbarComp';


const Navigation:FC<NavigationTYPE> = ({opened,setopened}) => {

  // INITIALIZATIONS
  // main app state
  // user logged or not
  // navigate hook
  const { mainappstate, setmainappstate } = useMainApp()
  const [isLogged, setIsLogged] = useState(false)
  const navigate = useNavigate()
  

  // LOGIN CHECKER FUNCTION
  const isLoggedfn = (state:appStateTYPE):boolean => {
    return state?.username !== null;    
  };

  // SET ISLOGGED
  useEffect(() => {
    setIsLogged(() => {
     return isLoggedfn(mainappstate)
    })
  }, [mainappstate])

  // LOG OUT FUNCTION
  const logoutfn = () => {
    setmainappstate(appState)
    navigate('/')
  };  

return (
  <NavbarComp isLogged={isLogged}  logoutfn={logoutfn} /> 
)
}

export default Navigation;