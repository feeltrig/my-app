import React, {FC} from 'react'
import { useOutletContext } from 'react-router-dom';

// IMPORT INTERFACES
import { appStateINF } from "../../interfaces/appStateINF";


const PasswordDisplay:FC = () => {

  // INITIALIZATIONS
  // main app state
  const mainState:appStateINF = useOutletContext();


  console.log(mainState.passwordData)

  return (
    <div className='passwordContainer' > 
      {mainState.passwordData.map((item,index) => {
        return(<div key={index}>
        <p>{item.title}</p>
        <p>{item.password}</p>
        </div>)
      })}
    </div>
  )
}

export default PasswordDisplay;