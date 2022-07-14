import React from 'react'
import { useMantineTheme } from '@mantine/core';

type Props = {}

const Home = (props: Props) => {
  const theme = useMantineTheme()
  return (
    <div style={{background:theme.colors.orange[0],fontSize:theme.fontSizes.xl}}>Welcome to password manager</div>
  )
}

export default Home;