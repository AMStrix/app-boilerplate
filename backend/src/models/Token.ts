import * as cuid from "cuid";
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert
} from "typeorm";
import { ObjectType, Field } from "type-graphql";

export enum Roles {
  ADMIN,
  PRO,
  USER
}

@ObjectType()
@Entity("token")
export class Token extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("increment")
  readonly id: number;

  @Field()
  @Column("varchar", { length: 255, unique: true })
  token: string;

  @Field()
  @Column("timestamp")
  expiration: Date;

  @BeforeInsert()
  async generateTokenBeforeInsert() {
    this.token = cuid();
  }
}
