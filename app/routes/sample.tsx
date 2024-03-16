import { Console, Effect, pipe } from "effect";

type TUser = {
  name: string;
  age: number;
};
export default function Index() {
  const user = {
    name: "hello",
    age: 20,
  };
  const program = pipe(user, validateUser);
  const handleClick = () => {
    const result = Effect.match(program, {
      onSuccess: () => console.log("success"),
      onFailure: (error) => window.alert(error),
    });

    return Effect.runSync(result);
  };

  return <button onClick={handleClick}>sample</button>;
}

const validateUser = (user: TUser) => {
  return user.age < 18 ? Effect.succeed("child") : Effect.fail("adult");
};
