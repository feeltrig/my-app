import { Button, Center, Text } from '@mantine/core'
import React from 'react'
import { Link } from 'react-router-dom'



const Errorpage = () => {
  return (
    <>
    <Text align='center' >Wrong url</Text>
    <Center my='md'>
    <Button component={Link} to='/' type='button'  >Go back Home</Button>

    </Center>
    </>
  )
}

export default Errorpage