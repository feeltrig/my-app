import { Button, Container, TextInput } from '@mantine/core';
import axios from 'axios'
import React, { useState, FormEvent, FC } from 'react'
import { useOutletContext } from 'react-router-dom';

// INTERFACE IMPORTS
import { appStateTYPE } from '../../AppState/appstate';
import {createPasswordINF} from "../../interfaces/createPasswordINF";

export type valueProps = string | null;



const CreatePassword:FC = () => {
  // INTIALIZATIONS
  // username
  // password
  // main app state
  const [title, setTitle] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const {username, userpassword, pincode} = useOutletContext<appStateTYPE>();

  // FORM CLEANER
  const formcleaner = () => {
    setTitle('')
    setpassword('')
  };

   // HANDLE FORM INPUT
   const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {
   
    if(e.target.name === 'title'){
      setTitle(e.target.value)
    } else if (e.target.name === 'password'){
      setpassword(e.target.value)
    }

  };

  // FORM SUBMIT HANDLER
  const handlesubmit = (e:FormEvent<HTMLFormElement>):void => {
    e.preventDefault();

    // create passwordData object
    const passwordData:createPasswordINF = {
      username,
      userpassword,
      pincode,
      title,
      password
    }


    // sending passwordData to database
    axios.post(`http://localhost:3001/user/Passwords`,
    passwordData).then((res) => {
      console.log(res.status)     
      return res
    }).then((result) => {
      console.log(result.data.message)
    })

       // clear form field
       formcleaner()
  }

  return (
    <>
    <Container my="2rem">
      <form onSubmit={(e) => {handlesubmit(e)}} >

        {/* title */}
        <TextInput  required label="title" type='password' placeholder="your title"  onChange={handleInput}/>
        

        {/* password */}
        <TextInput  required label="password" type='password' placeholder="your password" onChange={handleInput}  />
        

        {/* submit */}
        <Button type='submit' my="1rem" >Submit</Button>
      </form>
    </Container>

    </>
  )
}

export default CreatePassword;