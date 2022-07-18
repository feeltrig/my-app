import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { Box, Burger, Center, Container,  CSSObject,  Grid,  Group, Header, MediaQuery, Title } from "@mantine/core";

export type HeaderProps = {
  setopened: Dispatch<SetStateAction<boolean>>

}

const HeaderComponent:FC<HeaderProps> = ({setopened}:HeaderProps) => {

  const [burgeropen, setburgeropen] = useState<boolean>(false)


  
  return ( 
        <Header height='3rem'>
         <Group position='apart' style={{height:'3rem'}} px='1rem' >
          <Title order={3}>Password Manager</Title>
          <MediaQuery largerThan='xs' styles={{visibility:"hidden"}}>
            <p className='reset'>
              <Burger  opened={burgeropen} onClick={() => {setburgeropen((prev) => { return !prev}); setopened((prev) => {return !prev}) }} / >
            </p>
          </MediaQuery>
        </Group>  

        </Header>
  )
}

export default HeaderComponent