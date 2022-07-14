import { passwordDataINF } from "./passwordDataINF";

export interface appStateINF {
  username: string | null;
  password: string | null;
  pincode: string | null;
  passwordData: passwordDataINF[];
  authToken: string | null;
}
