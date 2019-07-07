import { Resolver, Query, Ctx } from "type-graphql";

import { User } from "../../models/User";
import { Context } from "../../context.interface";

@Resolver(User)
export class MeResolver {
  // @Authorized() - don't throw for unuathed cuz we use this to check if logged in
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: Context): Promise<User | null> {
    if (ctx.req.session.userId) {
      return await User.findOneOrFail(ctx.req.session.userId);
    }
    return null;
  }
}
