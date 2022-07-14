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

  console.log(typeof "")


  // FORM SUBMIT HANDLER
  const handlesubmit = (e:FormEvent<HTMLFormElement>):void => {
    e.preventDefault();

    formcleaner()

    
    // create passwordData object
    const passwordData:createPasswordINF = {
      username,
      userpassword,
      pincode,
      title,
      password
    }

    console.log(passwordData)

    // sending passwordData to database
    axios.post(`http://localhost:3001/user/Passwords`,
    passwordData).then((res) => {
      console.log(res)
     
      return res
    }).then((result) => {
      console.log(result)
    })
  }

  return (
    <>
    <div>
      <form onSubmit={(e) => {handlesubmit(e)}} >

        {/* title */}
        <label htmlFor="title" >Title</label>
        <input type="text" value={title} onChange={(e) => {setTitle(e.target.value)}} />

        {/* password */}
        <label htmlFor="password">Password</label>
        <input type="password" value={password} onChange={(e) => {setpassword(e.target.value)}} />

        {/* submit */}
        <button type='submit' >Sumbit</button>
      </form>
    </div>

    </>
  )
}

export default CreatePassword;