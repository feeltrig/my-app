import React, {FC} from 'react'
import { Outlet } from "react-router-dom";


const Passwords = () => {
  return (
    <div>

      <button type='button' >Create password</button>
      <button type='button' >Show saved passwords</button>
      <Outlet />
    </div>
  )
}

export default Passwords;