import React, { useEffect, useState } from 'react'
import { Route, useNavigate } from 'react-router-dom'
import { appStateTYPE, useMainApp } from '../AppState/appstate'
import CreatePassword from './passwords/createPassword'
import PasswordDisplay from './passwords/passwordDisplay'
import Passwords from './passwords/passwords'

type Props = {}

const ProtectedRoutes = (props: Props) => {

    
      // INITIALIZATIONS
  // main app state
  // user logged or not
  // navigate hook
  const { mainappstate, setmainappstate } = useMainApp()
  const [isLogged, setIsLogged] = useState(false)
  const navigate = useNavigate()

  // LOGIN CHECKER FUNCTION
  const isLoggedfn = (state:appStateTYPE):boolean => {
    console.log(state?.username !== null)
    return state?.username !== null;    
  };

  // SET ISLOGGED
  useEffect(() => {
    setIsLogged(() => {
     return isLoggedfn(mainappstate)
    })
  }, [mainappstate])

  if(isLogged){
    return (
        <div>
             <Route path="passwords" element={<Passwords/>}>
                <Route path='createpassword' element={<CreatePassword /> } /> 
                <Route path='passwordDisplay' element={<PasswordDisplay />} /> 
              </Route>
        </div>
      )
  }
  
}

export default ProtectedRoutes