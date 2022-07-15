import { createContext, useContext, SetStateAction, Dispatch, useState, FC,  ReactNode } from "react";

// PASSWORDDATA INTERFACE
import { passwordDataINF } from "../interfaces/passwordDataINF";

// MAIN APP STATE TYPE
export type appStateTYPE = {
  username: string | null;
  userpassword: string | null;
  pincode: number | null;
  passwordData: passwordDataINF[];
  authToken: string | null;
};

// MAIN STATE OBJECT
export const appState = {
  username: null,
  userpassword: null,
  pincode: null,
  passwordData: [],
  authToken: null,
};


// USESTATE HOOK TYPE
export type contextTYPE = {
  mainappstate:appStateTYPE,
  setmainappstate: Dispatch<SetStateAction<appStateTYPE>>
};


// APP CREATE CONTEXT
export const appContext = createContext<contextTYPE>({} as contextTYPE );


// CONTEXT PROVIDER TYPE
type ContextProps = {
  children: ReactNode ,
  
}

export const ContextProvider:FC<ContextProps> = ({children}) => {
  const [mainappstate, setmainappstate] = useState<appStateTYPE>(appState)

  return <appContext.Provider value={{mainappstate,setmainappstate}} >
    {children}
  </appContext.Provider>
  
};


// USE CONTEXT FUNCTION
export function useMainApp() {
  return useContext(appContext);
}
