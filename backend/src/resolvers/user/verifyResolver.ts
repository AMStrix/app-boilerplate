import { Resolver, Mutation, Arg, Ctx } from "type-graphql";

import { VerifyInput } from "./verifyInput";
import {
  invalidTokenError,
  accountAlreadyVerifiedError
} from "../../utils/errorMessages";
import { User } from "../../models/User";
import { Context } from "../../context.interface";

@Resolver(User)
export class VerifyResolver {
  @Mutation(() => Boolean)
  async verify(
    @Arg("verifyData") verifyData: VerifyInput,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    // TODO - use pg
    // const [[, id], [,]] = await redis
    //   .pipeline()
    //   .get(confirmUserPrefix + verifyData.token)
    //   .del(confirmUserPrefix + verifyData.token)
    //   .exec();

    const token = verifyData.token;

    const id = "TODO";

    if (!token || !id) {
      throw invalidTokenError();
    }

    const user = await User.findOneOrFail(id!);

    if (user.verified) {
      throw accountAlreadyVerifiedError();
    }

    user.verified = true;
    await user.save();

    ctx.req.session.userId = user.id;
    ctx.req.session.userRole = user.role;

    return true;
  }
}
