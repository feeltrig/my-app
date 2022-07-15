import { Box, Navbar, Text, createStyles, Stack, Button, MediaQuery } from '@mantine/core';
import React , {FC, useEffect, useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useMainApp } from '../AppState/appstate';

// TYPE IMPORTS
import { appStateTYPE } from "../AppState/appstate";

// DEFAULT APP STATE IMPORT
import { appState } from "../AppState/appstate";


const Navigation:FC = () => {

  // INITIALIZATIONS
  // main app state
  // user logged or not
  // navigate hook
  const { mainappstate, setmainappstate } = useMainApp()
  const [isLogged, setIsLogged] = useState(false)
  const navigate = useNavigate()

  // LOGIN CHECKER FUNCTION
  const isLoggedfn = (state:appStateTYPE):boolean => {
    console.log(state?.username !== null)
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
  <MediaQuery smallerThan='md' styles={{width:"10rem"}}>
    <Navbar  p="xs" width={{ base: 300 }}>
      <Navbar.Section>{"passwordmanager"}</Navbar.Section>
      <Navbar.Section grow mt="md">
        {

          <Stack spacing={5}>
            <Button color='blue' size='sm'  variant="subtle" component={Link} to='/' radius="xs">
              Home
            </Button>

            { !isLogged && <Button color='blue' size='sm'  variant="subtle" component={Link} to='login' radius="xs">
              login
            </Button>}
            <Button color='blue' size='sm'  variant="subtle" component={Link} to='signin' radius="xs">
      signin
            </Button>
            <Button color='blue' size='sm'  variant="subtle" component={Link} to='passwords' radius="xs">
              passwords
            </Button>
            {isLogged &&
               <Button color='blue' size='sm'  variant="subtle" onClick={logoutfn} radius="xs">
               Log out
             </Button>
            }
          </Stack>
        }</Navbar.Section>
      <Navbar.Section>{/* Footer with user */}</Navbar.Section>
    </Navbar>
</MediaQuery>
)
}

export default Navigation;