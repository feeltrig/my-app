import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { Box, Burger, Container,  Group, Header, MediaQuery, Title } from "@mantine/core";

export type HeaderProps = {
  setopened: Dispatch<SetStateAction<boolean>>

}

const HeaderComponent:FC<HeaderProps> = ({setopened}:HeaderProps) => {

  const [burgeropen, setburgeropen] = useState<boolean>(false)
  
  return (
    <Header height='100%' className='headercustom'>
      <Container   fluid>
        
        <Group position='apart'>
          <Title order={3}>Password Manager</Title>
          <MediaQuery largerThan='xs' styles={{visibility:"hidden"}}>
            <p>
              <Burger  opened={burgeropen} onClick={() => {setburgeropen((prev) => { return !prev}); setopened((prev) => {return !prev}) }} / >
            </p>
          </MediaQuery>
        </Group>
        
      </Container>    
    </Header>
  )
}

export default HeaderComponent