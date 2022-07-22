import React, { useState, FormEvent, FC } from "react";
import axios from "axios";

// INTERFACES
import SigninProfile from "../interfaces/SigninProfile";

//  FUNCTION IMPORTS
import { useMainApp } from "../AppState/appstate";
import { Button, TextInput, Container } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { notify } from "../Pages/myaccount";

const Signin: FC = () => {
  // INTIALIZATIONS
  // username
  // password
  // main app state
  // navigate hook
  // signin error
  const [username, setUsername] = useState<string>("");
  const [userpassword, setuserpassword] = useState<string>("");
  const [pincode, setPincode] = useState<string | number>("");
  const { mainappstate, setmainappstate } = useMainApp();
  const navigate = useNavigate();
  const [signinerror, setsigninerror] = useState<boolean>(false);
  const [loginloader, setloginloader] = useState<boolean>(false);

  // FORM CLEANER
  const formcleaner = () => {
    setuserpassword("");
    setUsername("");
    setPincode("");
  };

  // FORM SUBMIT HANDLER
  const handlesubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    setloginloader(true);

    // create userprofile object
    const userProfile: SigninProfile = {
      username,
      userpassword,
      pincode,
    };

    // set main app state

    const handlesingnin = async () => {
      const res = await axios.post(
        "http://localhost:3001/user/signin",
        userProfile
      );
      const signinstatus = await res;

      // notification for success and user exists
      notify(signinstatus.data.message);
      setloginloader(false);

      // set state only if sign in returns true
      if (signinstatus.data.signin) {
        setmainappstate((prevstate) => {
          const newstate = { ...prevstate, username, userpassword, pincode };
          return newstate;
        });
        navigate("/");
      }
    };

    handlesingnin().catch((err) => {
      notify(err.message);
      setloginloader(false);
    });

    formcleaner();
  };

  // HANDLE FORM INPUT
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "password") {
      setuserpassword(e.target.value);
    } else if (e.target.name === "pincode") {
      setPincode(Number(e.target.value));
    }
  };

  return (
    <>
      <Container fluid>
        <form
          onSubmit={(e) => {
            handlesubmit(e);
          }}
        >
          {/* username */}
          <TextInput
            size="sm"
            type="text"
            placeholder="your username"
            required
            label="username"
            autoComplete="current-username"
            name="username"
            value={username}
            onChange={handleInput}
          />

          {/* password */}
          <TextInput
            required
            label="password"
            placeholder="your password..."
            name="password"
            autoComplete="current-password"
            type="password"
            value={userpassword}
            onChange={handleInput}
          />

          {/* pincode */}
          <TextInput
            required
            label="pincode"
            name="pincode"
            placeholder="your pincode"
            type="number"
            value={pincode}
            onChange={handleInput}
          />

          {/* signin */}
          <Button my="sm" type="submit" loading={loginloader}>
            Sign in
          </Button>
          {/* clear */}
          <Button
            m="sm"
            onClick={() => {
              formcleaner();
            }}
          >
            Clear
          </Button>
        </form>
      </Container>
    </>
  );
};

export default Signin;
