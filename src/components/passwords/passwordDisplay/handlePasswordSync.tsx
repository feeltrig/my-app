import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { appStateTYPE } from "../../../AppState/appstate";
import { passwordDataINF } from "../../../interfaces/passwordDataINF";
import { notify } from "../../../Pages/myaccount";

export type propsTYPE = {
  setloading: Dispatch<SetStateAction<boolean>>;
  guestlogin: boolean;
  passwordData: passwordDataINF[];
  mainappstate: appStateTYPE;
  setmainappstate: Dispatch<SetStateAction<appStateTYPE>>;
};

const handlePasswordSync = ({
  setloading,
  guestlogin,
  passwordData,
  mainappstate,
  setmainappstate,
}: propsTYPE) => {
  setloading(true);
  if (!guestlogin) {
    if (passwordData?.length > 0) {
      // payload
      const { username, userpassword, pincode, passwordData } = mainappstate;
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
  }
};

export default handlePasswordSync;
