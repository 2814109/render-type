import { user } from "~/constants";
import { Action, TUser } from "~/types";

export const userReducer = (state: TUser, action: Action) => {
  switch (action.type) {
    case "UPDATE_NAME":
      return { ...state, name: action.payload };
    case "UPDATE_AGE":
      return { ...state, age: action.payload };
    case "RESET_USER":
      return user;
    default:
      return state;
  }
};
