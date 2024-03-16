import { Effect } from "effect";
import { TUser } from "~/types";

export const validateUser = (user: TUser) => {
  return user.age < 18 ? Effect.succeed(user) : Effect.fail("adult");
};
