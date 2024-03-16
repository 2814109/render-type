import { TRIPLE, user } from "~/constants";
import { useCount } from "~/hooks/useCount";

export default function Index() {
  const { handleClick, handleReset, state } = useCount();

  return (
    <>
      <p>init value is {JSON.stringify(user)}</p>
      <p>multiplication : {TRIPLE}</p>
      <button onClick={handleClick}>GrowUp</button>
      <button onClick={handleReset}>Reset</button>
      <p>{state.count}</p>
    </>
  );
}
