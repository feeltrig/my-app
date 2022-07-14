import React, {FC} from 'react'
import { Outlet, Link } from "react-router-dom";


// IMPORT MAIN APP STATE
import { useMainApp } from "../../AppState/appstate";


const Passwords:FC = () => {

  // INITIALIZATIONS
  // main app state
  const { mainappstate, setmainappstate } = useMainApp()
 
  
  

  
 

  return (
    <div>


      <button type='button' > 
      <Link to='createpassword' >Create Password</Link>
      </button>
     
      <button type='button' > 
      <Link to='passwordDisplay' >Diplay passwords</Link>
      </button>
     
      
      <Outlet context={mainappstate} />
    </div>
  )
}

export default Passwords;