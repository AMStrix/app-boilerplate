import { AuthChecker } from "type-graphql";
import { Context } from "../context.interface";

export const authChecker: AuthChecker<Context> = ({ context }, roles) => {
  if (!context) {
    return false;
  }

  if (roles.length === 0) {
    return context.req.session.userId !== undefined;
  }

  if (!context.req.session.userId) {
    return false;
  }

  // TOOD - change User.roles to strings ADMIN, MODERATOR, USER, &etc.
  // if (roles.includes(context.req.session.userRole as number)) {
  //   return true;
  // }

  return false;
};
