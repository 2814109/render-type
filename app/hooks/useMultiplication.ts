import { useCallback, useReducer } from "react";
import { TRIPLE } from "~/constants";

export const useMultiplication = () => {
  const initialState = { count: TRIPLE };
  const multiplicationReducer = (
    state: typeof initialState,
    action: { type: "INCREMENT" | "DECREMENT" | "RESET" }
  ) => {
    switch (action.type) {
      case "INCREMENT":
        return { ...state, count: state.count + 1 };
      case "DECREMENT":
        return { ...state, count: state.count - 1 };
      case "RESET":
        return initialState;
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(multiplicationReducer, initialState);
  const handleCountUp = useCallback(() => dispatch({ type: "INCREMENT" }), []);
  const handleCountDown = useCallback(
    () => dispatch({ type: "DECREMENT" }),
    []
  );
  const handleReset = useCallback(() => dispatch({ type: "RESET" }), []);
  return {
    handleCountUp,
    handleCountDown,
    handleReset,
    state,
  };
};
