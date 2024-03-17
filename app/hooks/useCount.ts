import { useCallback, useReducer } from "react";
import { Effect as E } from "effect";
import { reducer } from "~/libs/reducer";
import { TRIPLE, user } from "~/constants";

export const useCount = () => {
  const [state, dispatch] = useReducer(reducer, user);

  const growUp = (multiplication: number) => (user: typeof state) =>
    E.succeed(user.age * multiplication);

  const validateUser = (user: typeof state) =>
    user.age < 18 ? E.succeed(user) : E.fail("adult");

  const program = E.succeed(user).pipe(
    E.flatMap(validateUser),
    E.flatMap(growUp(TRIPLE))
  );

  const handleClick = useCallback(
    () =>
      E.runSync(
        E.match(program, {
          onSuccess: (success) =>
            dispatch({ type: "SET_COUNT", payload: success }),
          onFailure: (error) => window.alert(error),
        })
      ),
    []
  );

  const handleReset = useCallback(() => dispatch({ type: "RESET_COUNT" }), []);

  return {
    handleClick,
    handleReset,
    state,
  };
};
