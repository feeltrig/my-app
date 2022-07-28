import { TextInput, Button, Container, Box, CloseButton } from "@mantine/core";

import axios from "axios";
import React, {
  useState,
  FormEvent,
  FC,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import { useNavigate } from "react-router-dom";
import { useMainApp } from "../AppState/appstate";

// NOTIFICATION FUNCTION
import { notify } from "../Pages/myaccount";

export type LoginProps = {
  setguestlogin: Dispatch<SetStateAction<boolean>>;
};

const Login: FC<LoginProps> = ({ setguestlogin }) => {
  // INTIALIZATIONS
  // username
  // password
  // main app state
  // navigate
  // loader
  const [username, setUsername] = useState<string>("");
  const [userpassword, setuserpassword] = useState<string>("");
  const [errormsg, seterrormsg] = useState<string>("");
  const { mainappstate, setmainappstate } = useMainApp();
  const navigate = useNavigate();
  const [loginloader, setloginloader] = useState<boolean>(false);

  // INTERFACES
  interface userProfile {
    username: string;
    userpassword: string;
  }

  // FORM CLEANER
  const formcleaner = () => {
    setuserpassword("");
    setUsername("");
    seterrormsg("");
  };

  // HANDLE FORM INPUT
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "userpassword") {
      setuserpassword(e.target.value);
    }
  };

  // FORM SUBMIT HANDLER
  const handlesubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    setloginloader(true);

    // create userprofile object
    const userProfile: userProfile = {
      username,
      userpassword,
    };

    // error message handler
    if (username === null || "") {
      seterrormsg("Please input your username");
    } else if (username.length > 40) {
      seterrormsg("Username too long");
    }

    // set main app state

    // sending userprofile to database
    const handlelogin = async () => {
      const response = await axios.post(
        "http://localhost:3001/user/login",
        userProfile
      );
      const result = await response.data;

      if (result.login) {
        notify("user doest exists");
        setloginloader(false);
      } else {
        notify("login succesfull");
        setmainappstate((prev) => {
          return result;
        });
        formcleaner();
        setloginloader(false);

        navigate("/");
      }
    };

    handlelogin().catch((err) => {
      notify(err.message + " Please try again later");
      setloginloader(false);
    });
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          handlesubmit(e);
        }}
      >
        <Container
          fluid
          classNames={{
            TextInput: {
              root: "logininput",
            },
          }}
        >
          {/* username */}
          <TextInput
            type="text"
            placeholder="your username"
            required
            autoComplete="current-username"
            label="username"
            name="username"
            value={username}
            error={errormsg}
            onChange={handleInput}
          />

          {/* password */}
          <TextInput
            required
            label="password"
            type="password"
            autoComplete="current-password"
            placeholder="your password"
            value={userpassword}
            name="userpassword"
            onChange={handleInput}
          />

          {/* login */}
          <Button type="submit" loading={loginloader} my="1rem">
            Login
          </Button>
          <Button
            onClick={() => {
              setguestlogin(true);
              navigate("/");
            }}
            m="1rem"
          >
            Guest Login
          </Button>
          <Button
            m="1rem"
            onClick={() => {
              formcleaner();
            }}
          >
            Clear
          </Button>
        </Container>
      </form>
    </>
  );
};

export default Login;
