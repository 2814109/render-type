import { useCallback, useReducer } from "react";
import { Effect as E, Option } from "effect";
import { user } from "~/constants";
import { userReducer } from "~/libs/userReducer";
import { User } from "~/types";

export const useUser = (multiplication: number) => {
  const withEmail: User = {
    id: 1,
    username: "john_doe",
    email: Option.some("john.doe@example.com"),
  };

  const withoutEmail: User = {
    id: 2,
    username: "jane_doe",
    email: Option.none(),
  };

  const foo = Option.some(1);
  const bar = Option.none();

  const result = Option.match(foo, {
    onNone: () => "Option is empty",
    onSome: (value) => `Option has a value: ${value}`,
  });

  const _result = Option.match(bar, {
    onNone: () => "Option is empty",
    onSome: (value) => `Option has a value: ${value}`,
  });

  console.log(result);
  console.log(_result);

  // state
  const [state, dispatch] = useReducer(userReducer, user);

  // libs
  const growUp = useCallback(
    (multiplication: number) => (user: typeof state) =>
      E.succeed(user.age * multiplication),
    [multiplication]
  );

  const validateUser = useCallback(
    (user: typeof state) => (user.age < 18 ? E.succeed(user) : E.fail("adult")),
    []
  );

  // effect
  const program = E.succeed(state).pipe(
    E.flatMap(validateUser),
    // Using allows us to execute side effects during the computation without altering the result.
    E.tap(() => console.log("validate : OK")),
    E.flatMap(growUp(multiplication))
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
    [state, multiplication]
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
