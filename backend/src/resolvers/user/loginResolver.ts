import { Resolver, Ctx, Mutation, Arg } from "type-graphql";
import * as argon2 from "argon2";

import { User } from "../../models/User";
import {
  // accountNotVerifiedError,
  invalidLoginError
} from "../../utils/errorMessages";
import { LoginInput } from "./loginInput";
import { Context } from "../../context.interface";

@Resolver(User)
export class LoginResolver {
  @Mutation(() => User)
  async login(
    @Arg("loginData") loginData: LoginInput,
    @Ctx() ctx: Context
  ): Promise<User> {
    const user = await User.findOne({ email: loginData.email });

    if (!user) {
      throw invalidLoginError();
    }

    const valid = await argon2.verify(user.password, loginData.password);
    if (!valid) {
      throw invalidLoginError();
    }

    // TODO - create new authorization "Verified User"
    // if (!user.verified) {
    //   throw accountNotVerifiedError();
    // }

    // attach to session
    ctx.req.session.userId = user.id;
    ctx.req.session.userRole = user.role;

    return user;
  }
}
