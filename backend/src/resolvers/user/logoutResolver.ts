import { Resolver, Authorized, Ctx, Mutation } from "type-graphql";

import { User } from "../../models/User";
import { Context } from "../../context.interface";
import { sessionName } from "../../../config/default";

@Resolver(User)
export class LogoutResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: Context): Promise<boolean> {
    ctx.req.session.destroy(e => {
      console.error("Could not destroy session (in LogoutResolver)", e);
    });
    return await !!ctx.res.clearCookie(sessionName);
  }
}
