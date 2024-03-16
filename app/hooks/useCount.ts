import { useCallback, useReducer } from "react";
import { Effect, pipe } from "effect";
import { growUp } from "~/libs/growUp";
import { reducer } from "~/libs/reducer";
import { validateUser } from "~/libs/validateUser";
import { initialState, user } from "~/constants";

export const useCount = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const program = pipe(user, validateUser, Effect.flatMap(growUp));

  const handleClick = useCallback(() => {
    const result = Effect.match(program, {
      onSuccess: (success) => dispatch({ type: "SET_COUNT", payload: success }),
      onFailure: (error) => window.alert(error),
    });
    return Effect.runSync(result);
  }, []);

  const handleReset = useCallback(() => dispatch({ type: "RESET_COUNT" }), []);

  return {
    handleClick,
    handleReset,
    state,
  };
};
