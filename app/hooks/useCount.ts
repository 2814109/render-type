import { useCallback, useReducer } from "react";
import { Effect as E } from "effect";
import { TRIPLE, user } from "~/constants";
import { TUser } from "~/types";

export type Action =
  | { type: "SET_COUNT"; payload: number }
  | { type: "RESET_COUNT" }
  | { type: "UPDATE_NAME"; payload: string }
  | { type: "UPDATE_AGE"; payload: number }
  | { type: "RESET_USER" };

export const useCount = () => {
  const reducer = (state: TUser, action: Action) => {
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
  const [state, dispatch] = useReducer(reducer, user);

  const growUp = (multiplication: number) => (user: typeof state) =>
    E.succeed(user.age * multiplication);

  const validateUser = (user: typeof state) =>
    user.age < 18 ? E.succeed(user) : E.fail("adult");

  const program = E.succeed(state).pipe(
    E.flatMap(validateUser),
    E.flatMap(growUp(TRIPLE))
  );

  const handleClick = useCallback(
    () =>
      E.runSync(
        E.match(program, {
          onSuccess: (success) =>
            dispatch({ type: "UPDATE_AGE", payload: success }),
          onFailure: (error) => window.alert(error),
        })
      ),
    [state]
  );

  const handleReset = useCallback(() => dispatch({ type: "RESET_USER" }), []);

  return {
    dispatch,
    handleClick,
    handleReset,
    state,
  };
};
