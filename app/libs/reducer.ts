import { Action, State } from "~/types";

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_COUNT":
      return { ...state, count: action.payload + state.count }; // payloadで渡された数字をセット
    case "RESET_COUNT":
      return { ...state, count: 0 }; // 初期化
    default:
      return state;
  }
};
