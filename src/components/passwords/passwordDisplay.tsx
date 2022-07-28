import { Alert, Button, Table } from "@mantine/core";
import axios from "axios";
import React, { FC, useLayoutEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

// IMPORT INTERFACES/TYPES
import { contextTYPE } from "../../AppState/appstate";
import { passwordDataINF } from "../../interfaces/passwordDataINF";
import { passwordDisplayINF } from "../../interfaces/passwordDisplayINF";

// IMPORT FUNCTION
// notify fn
// fetch local passwords
// clear app password state
// sync with db
import { notify } from "../../Pages/myaccount";
import fetchlocalpasswords from "../passwords/passwordDisplay/fetchlocalpasswords";
import clearapppasswords from "../passwords/passwordDisplay/clearapppasswords";
import clearlocalpasswords from "../passwords/passwordDisplay/clearlocalpasswords";
import handlePasswordSync from "../passwords/passwordDisplay/handlePasswordSync";

const PasswordDisplay = () => {
  // INITIALIZATIONS
  // main app state
  // db passwords
  // loading state
  const { mainappstate, guestlogin, setmainappstate }: passwordDisplayINF =
    useOutletContext();
  const { username, userpassword, pincode, passwordData } = mainappstate;
  const [loading, setloading] = useState(false);

  // SAVE PASSWORDS LOCALLY
  const localstorePasswords = () => {
    const localpasswordstring = localStorage.getItem("localpasswords");
    // if localpasswordsa are present, append new ones else save all newones to localstorage
    if (localpasswordstring) {
      const localpasswords = JSON.parse(localpasswordstring);
      const newpasswords = [...passwordData];
      console.log(localpasswords, newpasswords);

      if (localpasswords.length > 0) {
        // combine both local and mainstate passwords to dispplay and store them locally
        const final = newpasswords.filter((lp) => {
          const insider = localpasswords.find((dbitem: passwordDataINF) => {
            return lp.title == dbitem.title;
          });
          // returns true if not found and gets added to final
          return insider == undefined;
        });
        const finalarr = localpasswords.concat(final);
        console.log(finalarr);
        localStorage.setItem("localpasswords", JSON.stringify(finalarr));

        // setting state
        setmainappstate((prev) => {
          const newstate = { ...prev, passwordData: finalarr };
          return newstate;
        });
      } else {
        console.log(passwordData);
        localStorage.setItem("localpasswords", JSON.stringify(passwordData));
      }
      notify("Synced succesfully");
    } else {
      notify("Synced succesfully");

      localStorage.setItem("localpasswords", JSON.stringify(passwordData));
    }
  };

  // CLEAR LOCALSTORAGE PASSWORDS

  // SYNC PASSWORDS WITH CLOUD
  // const handlePasswordSync = () => {
  //   setloading(true);
  //   console.log(passwordData);
  //   if (!guestlogin) {
  //     if (passwordData?.length > 0) {
  //       // payload
  //       const syncpasswordsPayload = {
  //         username,
  //         userpassword,
  //         pincode,
  //         passwordData,
  //       };

  //       console.log(syncpasswordsPayload);

  //       // send passwords to db for sync
  //       axios
  //         .post(
  //           "http://localhost:3001/user/syncpasswords",
  //           syncpasswordsPayload
  //         )
  //         .then((res) => {
  //           if (res.status < 400 && res.data.payload.length > 0) {
  //             setmainappstate((prev) => {
  //               const newstate = { ...prev, passwordData: res.data.payload };
  //               console.log(newstate);
  //               return newstate;
  //             });
  //             notify("Succesfully synced");
  //           }
  //         })
  //         .catch((err) => {
  //           console.error(err);
  //           notify(err.message);
  //         });
  //     } else {
  //       // get all passwords
  //       axios
  //         .get("http://localhost:3001/user/fetchpasswords")
  //         .then((res) => {
  //           console.log(res.data);

  //           if (res.status < 400 && res.data.payload.length > 0) {
  //             setmainappstate((prev) => {
  //               const newstate = { ...prev, passwordData: res.data.payload };
  //               console.log(newstate);
  //               return newstate;
  //             });
  //           }

  //           setloading(false);
  //         })
  //         .catch((err) => {
  //           console.error(err);
  //           setloading(false);
  //           notify(err.message);
  //         });
  //     }
  //   }
  // };

  return (
    <>
      {passwordData?.length > 0 && (
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
      )}
      {/* if no passwords on state fetch from localstorage */}
      {passwordData?.length < 1 && (
        <>
          <Alert my={"1rem"}>No passwords found</Alert>
          {/* fetch local passwords */}
          <Button
            onClick={() => {
              fetchlocalpasswords(setmainappstate);
            }}
          >
            Get locally saved passwords
          </Button>
          {/* clear local passwords */}
          <Button
            m={"1rem"}
            onClick={() => {
              clearlocalpasswords();
            }}
          >
            Clear local saved passwords
          </Button>
        </>
      )}
      {/* if logged on sync passwords with db */}
      {!guestlogin && (
        <Button
          my={"2rem"}
          loading={loading}
          onClick={() => {
            handlePasswordSync({
              setloading,
              guestlogin,
              mainappstate,
              passwordData,
              setmainappstate,
            });
          }}
        >
          Sync passwords
        </Button>
      )}
      {/* if created passwords save them locally */}
      {guestlogin && passwordData?.length > 0 && (
        <>
          <Button my={"1rem"} onClick={localstorePasswords}>
            Sync passwords
          </Button>

          <Button
            m={"1rem"}
            onClick={() => {
              clearapppasswords(setmainappstate);
            }}
          >
            Clear passwords
          </Button>
        </>
      )}
    </>
  );
};

export default PasswordDisplay;
