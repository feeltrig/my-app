import {  Avatar, Group, Text } from '@mantine/core';
import React from 'react'
import { useMainApp } from '../AppState/appstate';

// IMPORT INTERFACES
import { contextTYPE } from "../AppState/appstate";
import { appStateTYPE } from "../AppState/appstate";

// IMPORT SVGS
import user from '../Images/user.svg';
import { appStateINF } from '../interfaces/appStateINF';



const MyAccount = () => {

  // INITIALIZATIONS
  // main state
  const {mainappstate}:contextTYPE = useMainApp()
  const {username,userpassword,pincode} = mainappstate

  // MAIN INFO STYLE
  const mainInfoStyle:React.CSSProperties = {
    textTransform:'uppercase'
  }

  

  return (
    <div>
      <Group>
        <Avatar src={user} size='xl' radius='md'  />
        <div>
          <Text size='sm' color='dimmed' >My Accpunt</Text>
          <Text size='xl' weight={700} style={mainInfoStyle}  >{username}</Text>
          <Text size='xl' weight={700} style={mainInfoStyle}  >{userpassword}</Text>
          <Text size='xl' weight={700} style={mainInfoStyle}  >{pincode}</Text> 
        </div>
      </Group>
    </div>    
  )
}


export default MyAccount;