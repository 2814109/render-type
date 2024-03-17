import { useCallback, useReducer } from "react";
import { Effect as E } from "effect";
import { TRIPLE, user } from "~/constants";
import { userReducer } from "~/libs/userReducer";

export const useUser = () => {
  // state
  const [state, dispatch] = useReducer(userReducer, user);

  // libs
  const growUp = useCallback(
    (multiplication: number) => (user: typeof state) =>
      E.succeed(user.age * multiplication),
    []
  );

  const validateUser = useCallback(
    (user: typeof state) => (user.age < 18 ? E.succeed(user) : E.fail("adult")),
    []
  );

  // effect
  const program = E.succeed(state).pipe(
    E.flatMap(validateUser),
    E.flatMap(growUp(TRIPLE))
  );

  // action
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

  const handleChangeAge = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({
        type: "UPDATE_AGE",
        payload: Number(e.currentTarget.value),
      }),
    []
  );

  const handleChangeName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({
        type: "UPDATE_NAME",
        payload: e.currentTarget.value,
      }),
    []
  );

  const handleReset = useCallback(() => dispatch({ type: "RESET_USER" }), []);

  return {
    handleChangeAge,
    handleChangeName,
    handleClick,
    handleReset,
    state,
  };
};
