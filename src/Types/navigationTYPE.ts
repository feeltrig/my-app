import { Dispatch, SetStateAction } from "react";

export type NavigationTYPE = {
  opened: boolean;
  setopened: Dispatch<SetStateAction<boolean>>;
};
