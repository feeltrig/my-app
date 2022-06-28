import React , {FC} from 'react'
import { Link } from "react-router-dom";


const Navigation:FC = () => {
  return (
    <div>
      <Link to={'/'}>Home</Link>
      <Link to={'/signin'}>Signin</Link>
      <Link to={'/login'}>Login</Link>
      <Link to={'/passwords'}>Passwords</Link>
    </div>
  )
}

export default Navigation;