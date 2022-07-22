import { Button, Table } from "@mantine/core";
import axios from "axios";
import React, { FC, useState } from "react";
import { useOutletContext } from "react-router-dom";

// IMPORT INTERFACES/TYPES
import { contextTYPE } from "../../AppState/appstate";
import { passwordDataINF } from "../../interfaces/passwordDataINF";

// IMPORT FUNCTION
import { notify } from "../../Pages/myaccount";
import { guestINF } from "../protectedRoutes";

const PasswordDisplay = ({ guestlogin }: guestINF) => {
  // INITIALIZATIONS
  // main app state
  // db passwords
  // loading state
  const { mainappstate, setmainappstate }: contextTYPE = useOutletContext();
  const { username, userpassword, pincode, passwordData } = mainappstate;
  const [loading, setloading] = useState(false);

  console.log(mainappstate);

  // SYNC PASSWORDS WITH CLOUD
  const handlePasswordSync = () => {
    setloading(true);
    console.log(passwordData);
    if (passwordData?.length > 0) {
      // payload
      const syncpasswordsPayload = {
        username,
        userpassword,
        pincode,
        passwordData,
      };

      console.log(syncpasswordsPayload);

      // send passwords to db for sync
      axios
        .post("http://localhost:3001/user/syncpasswords", syncpasswordsPayload)
        .then((res) => {
          if (res.status < 400 && res.data.payload.length > 0) {
            setmainappstate((prev) => {
              const newstate = { ...prev, passwordData: res.data.payload };
              console.log(newstate);
              return newstate;
            });
            notify("Succesfully synced");
          }
        })
        .catch((err) => {
          console.error(err);
          notify(err.message);
        });
    } else {
      // get all passwords
      axios
        .get("http://localhost:3001/user/fetchpasswords")
        .then((res) => {
          console.log(res.data);

          if (res.status < 400 && res.data.payload.length > 0) {
            setmainappstate((prev) => {
              const newstate = { ...prev, passwordData: res.data.payload };
              console.log(newstate);
              return newstate;
            });
          }

          setloading(false);
        })
        .catch((err) => {
          console.error(err);
          setloading(false);
          notify(err.message);
        });
    }
  };

  return (
    <>
      <Table
        my={"1rem"}
        width={"2rem"}
        verticalSpacing={"xs"}
        horizontalSpacing={"xs"}
      >
        <thead>
          <tr>
            <th>Title</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {passwordData?.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.password}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {!guestlogin && (
        <Button my={"2rem"} loading={loading} onClick={handlePasswordSync}>
          Sync passwords
        </Button>
      )}
    </>
  );
};

export default PasswordDisplay;
