import axios from 'axios'
import React, { useState, FormEvent, FC } from 'react'




const Signin:FC = () => {

  // INTIALIZATIONS
  // username
  // password
  const [username, setUsername] = useState<string | null>("")
  const [password, setPassword] = useState<string | null>("")
  const [pincode, setPincode] = useState<number | null>(null)
  
  // INTERFACES
  interface userProfile {
    username: string | null,
    password: string | null,
    pincode: number | null
  }

  // FORM SUBMIT HANDLER
  const handlesubmit = (e:FormEvent<HTMLFormElement>):void => {
    e.preventDefault();
    
    // create userprofile object
    const userProfile:userProfile = {
      username: username,
      password: password,
      pincode: pincode
    }

    console.log(userProfile)

    // sending userprofile to database
    axios.post('http://localhost:3001/user/signin',
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

        {/* pincode */}
        <label htmlFor="pincode">Pincode</label>
        <input type="number" onChange={(e) => {setPincode(Number(e.target.value))}} />

        {/* login */}
        <button type='submit' >Login</button>
      </form>
    </div>

    </>
  )
}

export default Signin;