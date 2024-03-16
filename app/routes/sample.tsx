import { Effect, pipe } from "effect";
import { useReducer } from "react";

type TUser = {
  name: string;
  age: number;
};

interface State {
  count: number;
}
type Action = { type: "SET_COUNT"; payload: number } | { type: "RESET_COUNT" };

export default function Index() {
  const initialState = {
    count: 0,
  };

  const user = {
    name: "hello",
    age: 17,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const program = pipe(user, validateUser, Effect.flatMap(growUp));

  const handleClick = () => {
    const result = Effect.match(program, {
      onSuccess: (success) => dispatch({ type: "SET_COUNT", payload: success }),
      onFailure: (error) => window.alert(error),
    });
    return Effect.runSync(result);
  };

  const handleReset = () => dispatch({ type: "RESET_COUNT" });

  return (
    <>
      <button onClick={handleClick}>GrowUp</button>
      <button onClick={handleReset}>Reset</button>
      <p>{state.count}</p>
    </>
  );
}

const validateUser = (user: TUser) => {
  return user.age < 18 ? Effect.succeed(user) : Effect.fail("adult");
};

const growUp = (user: TUser) => Effect.succeed(user.age * 2);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_COUNT":
      return { ...state, count: action.payload + state.count }; // payloadで渡された数字をセット
    case "RESET_COUNT":
      return { ...state, count: 0 }; // 初期化
    default:
      return state;
  }
};
