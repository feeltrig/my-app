import React, { Dispatch, FC, SetStateAction } from "react";
import {
  Accordion,
  Button,
  Group,
  Stack,
  ThemeIcon,
  useMantineColorScheme,
} from "@mantine/core";
import { Link } from "react-router-dom";

export type NavbarCompTYPE = {
  isLogged: boolean;
  logoutfn: () => void;
  opened: boolean;
  setopened: Dispatch<SetStateAction<boolean>>;
};

const NavStack: FC<NavbarCompTYPE> = ({ isLogged, logoutfn, setopened }) => {
  // theme changer
  const { toggleColorScheme } = useMantineColorScheme();

  return (
    <Stack
      spacing={5}
      onClick={() => {
        setopened(false);
      }}
    >
      <Button
        color="dark"
        size="sm"
        variant="subtle"
        component={Link}
        to="/"
        radius="xs"
      >
        Home
      </Button>

      {/* hide buttons after log/sign in */}
      {!isLogged && (
        <>
          {" "}
          <Button
            color="dark"
            size="sm"
            variant="subtle"
            component={Link}
            to="login"
            radius="xs"
          >
            login
          </Button>
          <Button
            color="dark"
            size="sm"
            variant="subtle"
            component={Link}
            to="signin"
            radius="xs"
          >
            signin
          </Button>
        </>
      )}

      {/* show buttons if logged */}
      {isLogged && (
        <>
          <Button
            color="dark"
            size="sm"
            variant="subtle"
            component={Link}
            to="user/passwords"
            radius="xs"
          >
            Passwords
          </Button>

          <Button
            color="dark"
            size="sm"
            variant="subtle"
            component={Link}
            to="user/myaccount"
            radius="xs"
          >
            My Account
          </Button>

          <Button
            color="dark"
            size="sm"
            variant="subtle"
            onClick={logoutfn}
            radius="xs"
          >
            Log out
          </Button>
        </>
      )}
      <Button
        mt={"1rem"}
        color="light"
        size="sm"
        variant="filled"
        onClick={() => {
          toggleColorScheme();
        }}
        radius="xs"
      >
        Dark mode
      </Button>
    </Stack>
  );
};

export default NavStack;
