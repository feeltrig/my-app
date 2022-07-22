import { Dispatch, SetStateAction } from "react";

export type NavigationTYPE = {
  guestlogin: boolean;
  setguestlogin: Dispatch<SetStateAction<boolean>>;
  opened: boolean;
  setopened: Dispatch<SetStateAction<boolean>>;
};
