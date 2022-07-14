import React, { useState, FormEvent, FC } from 'react'
import axios from 'axios'

 // INTERFACES
 import SigninProfile from "../interfaces/SigninProfile";

//  FUNCTION IMPORTS
import { useMainApp } from "../AppState/appstate";
import { Button, TextInput, Container } from '@mantine/core';


const Signin:FC = () => {

  // INTIALIZATIONS
  // username
  // password
  // main app state
  const [username, setUsername] = useState<string | null>("")
  const [userpassword, setuserpassword] = useState<string | null>("")
  const [pincode, setPincode] = useState<number | null>(null)
  const {mainappstate,setmainappstate} = useMainApp()
  


  // FORM SUBMIT HANDLER
  const handlesubmit = (e:FormEvent<HTMLFormElement>):void => {
    e.preventDefault();
    
    // create userprofile object
    const userProfile:SigninProfile = {
      username,
      userpassword,
      pincode,
    }

    setmainappstate((prevstate) => {
      const newstate = {...prevstate, username, userpassword, pincode}
      return newstate;
    })




    // sending userprofile to database
    axios.post('http://localhost:3001/user/signin',
    userProfile).then((res) => {
      return res
    }).then((result) => {
      console.log(result.data.message)
    }).catch((err) => {
      console.log(err.message)
    })
    
  }

 

  // HANDLE FORM INPUT
  const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {
   
    if(e.target.name === 'username'){
      setUsername(e.target.value)
    } else if (e.target.name === 'password'){
      setuserpassword(e.target.value)
    } else if (e.target.name === 'pincode'){
      setPincode(Number(e.target.value))
    }

  };

  return (
    <>
    <Container  >
      <form onSubmit={(e) => {handlesubmit(e)}} >

        {/* username */}
        <TextInput  size="sm" type='text' placeholder="your username"  required label="username" name='username'  onChange={handleInput} />
       

        {/* password */}
        <TextInput  required label="password" placeholder='your password...' name='password' type='password'  onChange={handleInput} />
       

        {/* pincode */}
        <TextInput  required label="pincode" name='pincode' placeholder='your pincode' type='number'  onChange={handleInput} />
        

        {/* login */}
        <Button my='sm' type='submit'>Sign in</Button>
      </form>
    </Container>

    </>
  )
}

export default Signin;