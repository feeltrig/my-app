import axios from 'axios'
import React, { useState, FormEvent, FC, useContext, } from 'react'

// INTERFACE IMPORTS
import { passwordINF } from "../../interfaces/passwordINF";

// MAIN STATE IMPORTS
import { appContext } from "../../AppState/appstate";




const CreatePassword:FC = () => {
  // INTIALIZATIONS
  // username
  // password
  // main app state
  const [title, setTitle] = useState<string | null>("");
  const [password, setPassword] = useState<string | null>("");
  const mainState = useContext(appContext);

 console.log(mainState);
 

  // FORM SUBMIT HANDLER
  const handlesubmit = (e:FormEvent<HTMLFormElement>):void => {
    e.preventDefault();
    
    // create userprofile object
    const passwordData:passwordINF = {
      title: title,
      password: password 
    }

    console.log(passwordData)

    // sending userprofile to database
    axios.post('http://localhost:3001/user/login',
    JSON.stringify((passwordData))).then((res) => {
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
        <input type="text" onChange={(e) => {setTitle(e.target.value)}} />

        {/* password */}
        <label htmlFor="password">Password</label>
        <input type="password" onChange={(e) => {setPassword(e.target.value)}} />

        {/* submit */}
        <button type='submit' >Sumbit</button>
      </form>
    </div>

    </>
  )
}

export default CreatePassword;