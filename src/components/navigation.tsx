import { Navbar, Stack, Button, MediaQuery } from "@mantine/core";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMainApp } from "../AppState/appstate";

// TYPE IMPORTS
import { appStateTYPE } from "../AppState/appstate";

// DEFAULT APP STATE IMPORT
import { appState } from "../AppState/appstate";
import { NavigationTYPE } from "../Types/navigationTYPE";
import MobileNav from "./mobileNav";
import NavStack from "./navigation/navStack";

const Navigation: FC<NavigationTYPE> = ({
  guestlogin,
  setguestlogin,
  opened,
  setopened,
}) => {
  // INITIALIZATIONS
  // main app state
  // user logged or not
  // navigate hook
  const { mainappstate, setmainappstate } = useMainApp();
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  // LOGIN CHECKER FUNCTION
  const isLoggedfn = (state: appStateTYPE): boolean => {
    return state?.username !== null;
  };

  // SET ISLOGGED
  useEffect(() => {
    setIsLogged(() => {
      return isLoggedfn(mainappstate);
    });
    if (guestlogin) {
      setIsLogged(true);
    }
  }, [mainappstate, guestlogin]);

  // LOG OUT FUNCTION
  const logoutfn = () => {
    setmainappstate(appState);
    setguestlogin(false);

    navigate("/");
  };

  return (
    <>
      <Navbar hiddenBreakpoint="xs" hidden p="xs" width={{ base: "15rem" }}>
        <Navbar.Section mt="md" grow>
          {
            <NavStack
              isLogged={isLogged}
              opened={opened}
              setopened={setopened}
              logoutfn={logoutfn}
            />
          }
        </Navbar.Section>
      </Navbar>

      <MobileNav opened={opened} setopened={setopened}>
        <NavStack
          isLogged={isLogged}
          opened={opened}
          setopened={setopened}
          logoutfn={logoutfn}
        />
      </MobileNav>
    </>
  );
};

export default Navigation;
