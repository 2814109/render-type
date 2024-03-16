import { Effect } from "effect";
import { TUser } from "~/types";

export const growUp = (user: TUser) => Effect.succeed(user.age * 2);
