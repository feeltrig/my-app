import { Button,  MediaQuery,  Navbar, Stack } from '@mantine/core'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'

export type NavbarCompTYPE = {
    isLogged:boolean,
    logoutfn:()=>void

}

const NavbarComp:FC<NavbarCompTYPE> = ({isLogged,logoutfn}) => {
  return (
    <MediaQuery largerThan={786} styles={{width:'15rem'}} >
   
    <Navbar p="xs"   className='border' width={{base:"10rem"}} >
      
    <Navbar.Section  mt="md" grow >
      {

        <Stack spacing={5}>
          <Button color='blue' size='sm'  variant="subtle" component={Link} to='/' radius="xs">
            Home
          </Button>

          {/* hide buttons after log/sign in */}
          { !isLogged && <> <Button color='blue' size='sm'  variant="subtle" component={Link} to='login' radius="xs">
            login
          </Button>
          <Button color='blue' size='sm'  variant="subtle" component={Link} to='signin' radius="xs">
            signin
          </Button></>}

          {/* show buttons if logged */}
          { isLogged && 
          <>
          <Button color='blue' size='sm'  variant="subtle" component={Link} to='user/passwords' radius="xs">
            passwords
          </Button>

          <Button color='blue' size='sm'  variant="subtle" component={Link} to='user/myaccount' radius="xs">
            My Account
          </Button>
       
             <Button color='blue' size='sm'  variant="subtle" onClick={logoutfn} radius="xs">
             Log out
           </Button>
           </>
          }
        </Stack>
      }</Navbar.Section>
    <Navbar.Section>{/* Footer with user */}</Navbar.Section>
  </Navbar>

  </MediaQuery>
  
    
    
  )
}

export default NavbarComp;