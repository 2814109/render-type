import { Effect } from "effect";
import { TUser } from "~/types";

export const growUp = (multiplication: number) => (user: TUser) =>
  Effect.succeed(user.age * multiplication);
