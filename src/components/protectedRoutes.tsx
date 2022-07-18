import React, { FC, ReactElement, useEffect, useLayoutEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { appStateTYPE, useMainApp } from '../AppState/appstate'
import MyAccount from '../Pages/myaccount'
import Errorpage from './errorpage'
import CreatePassword from './passwords/createPassword'
import PasswordDisplay from './passwords/passwordDisplay'
import Passwords from './passwords/passwords'

export type ProtectedRINF = () => JSX.Element | null  

const ProtectedRoutes:ProtectedRINF = () => {

    
      // INITIALIZATIONS
  // main app state
  // user logged or not
  // navigate hook
  const { mainappstate, setmainappstate } = useMainApp()
  const [isLogged, setIsLogged] = useState(false)
  const navigate = useNavigate()

  // LOGIN CHECKER FUNCTION
  const isLoggedfn = (state:appStateTYPE):boolean => {
    return state?.username !== null;    
  };

  // SET ISLOGGED
  useLayoutEffect(() => {
    setIsLogged(() => {
     return isLoggedfn(mainappstate)
    })
  }, [mainappstate])

  console.log(isLogged)

  if(isLogged){
    return (
        <Routes>
             <Route path="passwords" element={<Passwords/>}>
                <Route path='createpassword' element={<CreatePassword /> } /> 
                <Route path='passwordDisplay' element={<PasswordDisplay />} /> 
              </Route>
              <Route path='myaccount' element={<MyAccount /> } />
        </Routes>
      )
  } else {
    return Errorpage();
  }

  return null;
  
}

export default ProtectedRoutes