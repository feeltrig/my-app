import { Dispatch, SetStateAction } from "react";
import { appStateTYPE } from "../AppState/appstate";

export interface contextINF {
  mainappstate: appStateTYPE;
  setmainappstate: Dispatch<SetStateAction<appStateTYPE>>;
}
