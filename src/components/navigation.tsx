import { Box, Navbar, Text, createStyles, Stack, Button } from '@mantine/core';
import React , {FC} from 'react'
import { Link } from "react-router-dom";




const useStyles = createStyles((theme, _params, getRef) => ({
  wrapper: {
    // subscribe to color scheme changes right in your styles
   
    height: 180,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: theme.radius.sm,

   
  },

  child: {
    // assign ref to element
    ref: getRef('child'),
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    display: 'flex',
    flexFlow: "row",
    padding: theme.spacing.md,
    borderRadius: theme.radius.sm,
    boxShadow: theme.shadows.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },
}));

const Navigation:FC = () => {



  const { classes } = useStyles();

return (
  <Navbar height={600} p="xs" width={{ base: 300 }}>
  <Navbar.Section>{"passwordmanager"}</Navbar.Section>
  <Navbar.Section grow mt="md">{

<Stack spacing={5}>
<Button color='blue' size='sm'  variant="subtle" component={Link} to='login' radius="xs">
      login
    </Button>
<Button color='blue' size='sm'  variant="subtle" component={Link} to='signin' radius="xs">
      signin
    </Button>
<Button color='blue' size='sm'  variant="subtle" component={Link} to='passwords' radius="xs">
      passwords
    </Button>


    
      </Stack>



  }</Navbar.Section>
  <Navbar.Section>{/* Footer with user */}</Navbar.Section>
</Navbar>

)

}



export default Navigation;