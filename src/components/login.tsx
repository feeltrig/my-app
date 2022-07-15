import {  TextInput, Button, Container } from '@mantine/core'
import axios from 'axios'
import React, { useState, FormEvent, FC, useCallback } from 'react'
import { useMainApp } from '../AppState/appstate'





const Login:FC = () => {

  // INTIALIZATIONS
  // username
  // password
  // main app state
  const [username, setUsername] = useState<string>("")
  const [userpassword, setuserpassword] = useState<string>("")
  const [errormsg, seterrormsg] = useState<string>("")
  const {setmainappstate} = useMainApp()

   
   

  // INTERFACES
  interface userProfile {
    username: string ,
    userpassword: string 
  }

   // FORM CLEANER
   const formcleaner = () => {
    setuserpassword('')
    setUsername('')
    seterrormsg('')
  };

  
  // HANDLE FORM INPUT
  const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {

    if(e.target.name === 'username'){
      setUsername(e.target.value)
    } else if (e.target.name === 'userpassword'){
      setuserpassword(e.target.value)
    } 

  };
  

  // FORM SUBMIT HANDLER
  const handlesubmit = (e:FormEvent<HTMLFormElement>):void => {
    e.preventDefault();
    
    // create userprofile object
    const userProfile:userProfile = {
      username,
      userpassword 
    }

    // error message handler
    if(username === null || ""){
      seterrormsg("Please input your username")
    } else if ( username.length > 40  ) {
      seterrormsg("Username too long")
    }

     // set main app state
     setmainappstate((prevstate) => {
      const newstate = {...prevstate, username, userpassword}
      return newstate;
    })


    // sending userprofile to database
    axios.post('http://localhost:3001/user/login',
    JSON.stringify((userProfile))).then((res) => {
      console.log(res)
      return res
    }).then((result) => {
      console.log(result)
    })

    formcleaner()
    
  }

  return (
    <>
   
    <Container fluid>
         <form onSubmit={(e) => {handlesubmit(e)}} >

        {/* username */}
        <TextInput   type='text'  placeholder="your username"  required label="username" name='username' value={username} error={errormsg} onChange={handleInput} />
       

        {/* password */}
        <TextInput  required label="password"  type='password' placeholder="your password" value={userpassword} name='userpassword' onChange={handleInput} />
       

        {/* login */}
        <Button type='submit' my="1rem" >Login</Button>
      </form>


    </Container>
     
   

    </>
  )
}

export default Login;