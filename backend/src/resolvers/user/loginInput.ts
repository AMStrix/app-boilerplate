import { User } from "../../models/User";
import { InputType, Field } from "type-graphql";
import { IsString, IsEmail, IsNotEmpty } from "class-validator";

@InputType()
export class LoginInput implements Partial<User> {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export interface LoginVariables {
  loginData: LoginInput;
}
export interface LoginFnArgs {
  variables: LoginVariables;
}
export type LoginFn = (args: LoginFnArgs) => any;
