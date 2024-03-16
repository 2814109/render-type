import { Console, Effect } from "effect";
export default function Index() {
  const program = Console.log("hello");
  const handleClick = () => Effect.runSync(program);

  return <button onClick={handleClick}>sample</button>;
}
