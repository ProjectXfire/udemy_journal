import { IUser } from "@modules/auth/interfaces";

interface IAuthState {
  uid: string;
  name: string;
}

type x = { type: "hola" };

type IAction =
  | { type: "[Auth]: Login"; payload: IUser }
  | { type: "[Auth]: Logout" };

export const AuthReducer = (state: IAuthState, action: IAction): IAuthState => {
  switch (action.type) {
    case "[Auth]: Login":
      return { ...state, uid: action.payload.uid, name: action.payload.name };
    case "[Auth]: Logout":
      return { ...state, uid: "", name: "" };
    default:
      return state;
  }
};
