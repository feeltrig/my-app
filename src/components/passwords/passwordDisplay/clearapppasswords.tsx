import { notify } from "../../../Pages/myaccount";
import { setstateTYPE } from "../../../Types/setmainstateTYPE";

const clearapppasswords = (setmainappstate: setstateTYPE) => {
  notify("Cleared current passwords");
  setmainappstate((prev) => {
    const newstate = { ...prev, passwordData: [] };
    return newstate;
  });
};

export default clearapppasswords;
