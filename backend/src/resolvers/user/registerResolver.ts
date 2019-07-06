import { Resolver, Ctx, Mutation, Arg } from "type-graphql";

import { User } from "../../models/User";
import { RegisterInput } from "./registerInput";
import { transporter } from "../../../config/nodemailer";
import { verifyAccountMail } from "../../utils/mails";
import { Token } from "../../models/Token";
import { Context } from "../../context.interface";

@Resolver(User)
export class RegisterResolver {
  @Mutation(() => User, { nullable: true })
  async register(
    @Arg("registerData") registerData: RegisterInput,
    @Ctx() ctx: Context
  ): Promise<User> {
    let user: User;

    try {
      user = await User.create(registerData).save();
      const token = await Token.create({
        expiration: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2)
      }).save();
      console.log("MAIL TOKEN", token); // log token while not live
      const x = await transporter.sendMail(
        verifyAccountMail(user, token.token)
      );
      console.log("MAIL RESULT", x.statusCode);
    } catch (error) {
      return error;
    }

    // login
    ctx.req.session.userId = user.id;
    ctx.req.session.userRole = user.role;

    return user;
  }
}
