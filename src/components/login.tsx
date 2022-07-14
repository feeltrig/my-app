import { Box, TextInput, Button, Container } from '@mantine/core'
import axios from 'axios'
import React, { useState, FormEvent, FC } from 'react'





const Login:FC = () => {

  // INTIALIZATIONS
  // username
  // password
  const [username, setUsername] = useState<string | null>("")
  const [password, setPassword] = useState<string | null>("")
  const [errormsg, seterrormsg] = useState<string | null>("")

  // INTERFACES
  interface userProfile {
    username: string | null,
    password: string | null
  }

  // FORM SUBMIT HANDLER
  const handlesubmit = (e:FormEvent<HTMLFormElement>):void => {
    e.preventDefault();
    
    // create userprofile object
    const userProfile:userProfile = {
      username: username,
      password: password 
    }

    if(username == null){
      alert("oops")
    }

    console.log(userProfile)

    // sending userprofile to database
    axios.post('http://localhost:3001/user/login',
    JSON.stringify((userProfile))).then((res) => {
      console.log(res)
      return res
    }).then((result) => {
      console.log(result)
    })
    
  }

  return (
    <>
   
    <Container size="xs" ml='10rem' px='10rem'>
         <form onSubmit={(e) => {handlesubmit(e)}} >

        {/* username */}
        <TextInput py={100} size="sm" type='text' placeholder="your username"  required label="username" error={errormsg} onChange={(e) => {setUsername(e.target.value)}} />
       

        {/* password */}
        <TextInput  required label="password" type='password'  onChange={(e) => {setPassword(e.target.value)}}/>
       

        {/* login */}
        <Button type='submit' my="1rem" >Login</Button>
      </form>


    </Container>
     
   

    </>
  )
}

export default Login;