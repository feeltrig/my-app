import { createContext } from "react";

import { passwordINF } from "../interfaces/passwordINF";

interface appStateINF {
  username: string | null;
  password: string | null;
  pincode: string | null;
  passwordData: passwordINF[];
  authToken: string | null;
}

export const appContext = createContext<appStateINF | null>(null);

export const appState: appStateINF = {
  username: null,
  password: null,
  pincode: null,
  passwordData: [],
  authToken: null,
};
