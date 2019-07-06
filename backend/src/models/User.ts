import * as argon2 from "argon2";
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { ApolloError } from "apollo-server-express";

export enum Roles {
  ADMIN,
  PRO,
  USER
}

@ObjectType()
@Entity("user")
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ type: "enum", enum: Roles, default: Roles.USER })
  role: Roles;

  @Field()
  @Column("varchar", { length: 255, unique: true })
  email: string;

  @Field()
  @Column("varchar", { length: 255, default: "" })
  displayName: string;

  @Column("text")
  password: string;

  @Field()
  @Column("boolean", { default: false })
  verified: boolean;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column("boolean", { default: false })
  silenced: boolean;

  @Field()
  @Column("boolean", { default: false })
  banned: boolean;

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    try {
      this.password = await argon2.hash(this.password, {
        type: argon2.argon2d
      });
    } catch (error) {
      throw new ApolloError(
        "Something went wrong while creating your account. Please try again."
      );
    }
  }
}
