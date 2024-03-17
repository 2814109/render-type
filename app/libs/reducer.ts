import { Action, TUser } from "~/types";

export const reducer = (state: TUser, action: Action) => {
  switch (action.type) {
    case "SET_COUNT":
      return { ...state, age: action.payload + state.age }; // payloadで渡された数字をセット
    case "RESET_COUNT":
      return { ...state, age: 0 }; // 初期化
    default:
      return state;
  }
};
