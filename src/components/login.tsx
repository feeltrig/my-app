import axios from 'axios'
import React, { useState, FormEvent, FC } from 'react'




const Login:FC = () => {

  // INTIALIZATIONS
  // username
  // password
  const [username, setUsername] = useState<string | null>("")
  const [password, setPassword] = useState<string | null>("")

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
    <div>
      <form onSubmit={(e) => {handlesubmit(e)}} >

        {/* username */}
        <label htmlFor="username" >Username</label>
        <input type="text" onChange={(e) => {setUsername(e.target.value)}} />

        {/* password */}
        <label htmlFor="password">Password</label>
        <input type="password" onChange={(e) => {setPassword(e.target.value)}} />

        {/* login */}
        <button type='submit' >Login</button>
      </form>
    </div>

    </>
  )
}

export default Login;