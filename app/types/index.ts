import { Option } from "effect";

export type TUser = {
  name: string;
  age: number;
};

export interface User {
  readonly id: number;
  readonly username: string;
  readonly email: Option.Option<string>;
}

export interface State {
  count: number;
}

export type Action =
  | { type: "SET_COUNT"; payload: number }
  | { type: "RESET_COUNT" }
  | { type: "UPDATE_NAME"; payload: string }
  | { type: "UPDATE_AGE"; payload: number }
  | { type: "RESET_USER" };
