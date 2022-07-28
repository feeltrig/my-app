import { Dispatch, SetStateAction } from "react";

// IMPORT TYPES
import { appStateTYPE } from "../../../AppState/appstate";
import { setstateTYPE } from "../../../Types/setmainstateTYPE";

// IMPORT FUNCTIONS
import { notify } from "../../../Pages/myaccount";

// FETCH LOCAL PASSWORDS
const fetchlocalpasswords = (setmainappstate: setstateTYPE) => {
  const localpasswrds = localStorage.getItem("localpasswords");
  // console.log(localpasswrds);
  if (localpasswrds !== null) {
    const final = JSON.parse(localpasswrds);
    if (final.length > 0) {
      setmainappstate((prev) => {
        const newstate = { ...prev, passwordData: final };
        return newstate;
      });
      notify("Fetched local passwords successfully");
    } else {
      notify("No locally saved passwords found");
    }
  } else {
    notify("No locally saved passwords found");
    console.log("no passwords");
  }
};

export default fetchlocalpasswords;
