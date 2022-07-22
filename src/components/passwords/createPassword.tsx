import { Button, Container, TextInput } from "@mantine/core";
import axios from "axios";
import React, { useState, FormEvent, FC } from "react";
import { useOutletContext } from "react-router-dom";

// INTERFACE IMPORTS
import { appStateTYPE } from "../../AppState/appstate";
import { contextTYPE } from "../../AppState/appstate";
import { createPasswordINF } from "../../interfaces/createPasswordINF";

export type valueProps = string | null;

const CreatePassword: FC = () => {
  // INTIALIZATIONS
  // username
  // password
  // main app state
  const [title, setTitle] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const { mainappstate, setmainappstate }: contextTYPE = useOutletContext();
  const { username, userpassword, pincode } = mainappstate;

  // FORM CLEANER
  const formcleaner = () => {
    setTitle("");
    setpassword("");
  };

  // HANDLE FORM INPUT
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "password") {
      setpassword(e.target.value);
    }
  };

  // FORM SUBMIT HANDLER
  const handlesubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // create passwordData object
    const payload = {
      username,
      userpassword,
      pincode,
      passwordData: { title, password },
    };

    // save passwords in mainappstate
    setmainappstate((prev) => {
      const newpasswordData = [...prev.passwordData];
      newpasswordData.push({ title, password });

      console.log(newpasswordData);
      return { ...prev, passwordData: newpasswordData };
    });

    // sending passwordData to database
    axios
      .post(`http://localhost:3001/user/Passwords`, payload)
      .then((res) => {
        console.log(res.status);
        return res;
      })
      .then((result) => {
        console.log(result.data.message);
      });

    // clear form field
    formcleaner();
  };

  return (
    <>
      <Container my="2rem">
        <form
          onSubmit={(e) => {
            handlesubmit(e);
          }}
        >
          {/* title */}
          <TextInput
            required
            label="title"
            type="text"
            name="title"
            placeholder="your title"
            onChange={handleInput}
            value={title}
          />

          {/* password */}
          <TextInput
            required
            label="password"
            name="password"
            type="password"
            placeholder="your password"
            onChange={handleInput}
            value={password}
          />

          {/* submit */}
          <Button type="submit" my="1rem">
            Submit
          </Button>

          {/* clear button */}
          <Button
            type="button"
            my={"1rem"}
            mx={"1rem"}
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

export default CreatePassword;
