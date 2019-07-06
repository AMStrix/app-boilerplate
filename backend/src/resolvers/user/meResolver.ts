import { Resolver, Authorized, Query, Ctx } from "type-graphql";

import { User } from "../../models/User";
import { Context } from "../../context.interface";

@Resolver(User)
export class MeResolver {
  @Authorized()
  @Query(() => User)
  async me(@Ctx() ctx: Context): Promise<User> {
    return await User.findOneOrFail(ctx.req.session.userId);
  }
}
