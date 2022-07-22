import { Button, Container } from "@mantine/core";
import React, { FC } from "react";
import { Outlet, Link } from "react-router-dom";

// IMPORT MAIN APP STATE
import { contextTYPE, useMainApp } from "../../AppState/appstate";

const Passwords: FC = () => {
  // INITIALIZATIONS
  // main app state
  // button variant
  const { mainappstate, setmainappstate }: contextTYPE = useMainApp();
  const buttonvaraint = "outline";

  return (
    <Container my={"1rem"} fluid>
      <Button
        type="button"
        mx="0.5rem"
        to="createpassword"
        component={Link}
        variant={buttonvaraint}
      >
        Create Password
      </Button>

      <Button
        type="button"
        mx="0.5rem"
        component={Link}
        to="passwordDisplay"
        variant={buttonvaraint}
      >
        Diplay passwords
      </Button>

      <Outlet context={{ mainappstate, setmainappstate }} />
    </Container>
  );
};

export default Passwords;
