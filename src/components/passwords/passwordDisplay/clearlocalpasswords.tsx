import { notify } from "../../../Pages/myaccount";

const clearlocalpasswords = () => {
  localStorage.removeItem("localpasswords");
  notify("Cleared locally stored passwords");
};

export default clearlocalpasswords;
