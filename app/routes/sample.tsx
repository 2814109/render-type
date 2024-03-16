import { useCount } from "~/hooks/useCount";

export default function Index() {
  const { handleClick, handleReset, state } = useCount();

  return (
    <>
      <button onClick={handleClick}>GrowUp</button>
      <button onClick={handleReset}>Reset</button>
      <p>{state.count}</p>
    </>
  );
}
