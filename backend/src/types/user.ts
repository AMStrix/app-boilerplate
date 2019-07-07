import { BaseEntity } from "typeorm";
import { User } from "../models/User";
import { PageResult } from "./pagination";
import { ObjectType } from "type-graphql";

export type UserAdmin = Pick<
  User,
  Exclude<
    keyof User,
    keyof BaseEntity | "hashPasswordBeforeInsert" | "password"
  >
>;

export type UserPublic = Pick<UserAdmin, "id" | "displayName" | "createdAt">;

export type UserPrivate = Exclude<UserAdmin, "password">;

@ObjectType()
export class UserPageResult extends PageResult(User) {}
