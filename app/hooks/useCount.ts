import { useCallback, useReducer } from "react";
import { Effect } from "effect";
import { reducer } from "~/libs/reducer";
import { TRIPLE, user } from "~/constants";

export const useCount = () => {
  const [state, dispatch] = useReducer(reducer, user);

  const growUp = (multiplication: number) => (user: typeof state) =>
    Effect.succeed(user.age * multiplication);

  const validateUser = (user: typeof state) =>
    user.age < 18 ? Effect.succeed(user) : Effect.fail("adult");

  const program = Effect.succeed(user).pipe(
    Effect.flatMap(validateUser),
    Effect.flatMap(growUp(TRIPLE))
  );

  const handleClick = useCallback(
    () =>
      Effect.runSync(
        Effect.match(program, {
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
