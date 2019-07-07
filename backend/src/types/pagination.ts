import { InputType, ObjectType, Field, ClassType, Int } from "type-graphql";
import { IsInt, IsNotEmpty, Max, IsString, Min } from "class-validator";

@InputType()
export class PageOffsetInput {
  @Field()
  @IsInt()
  @IsNotEmpty()
  offset: number;

  @Field()
  @IsInt()
  @Max(100)
  @IsNotEmpty()
  limit: number;
}

export interface PageOffsetVariables {
  page: PageOffsetInput;
}

@InputType()
export class PageInput {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  page: number;

  @Field(() => Int)
  @IsInt()
  @Max(100)
  @IsNotEmpty()
  pageSize: number;

  @Field(() => String, { nullable: true })
  @IsString()
  search?: string;

  @Field(() => [String], { nullable: true })
  @IsString({ each: true })
  sort?: string[];

  @Field(() => [String], { nullable: true })
  @IsString({ each: true })
  filters?: string[];
}

export interface PageVariables {
  page: PageInput;
}

export function PageResult<T>(TClass: ClassType<T>) {
  @ObjectType({ isAbstract: true })
  abstract class PageResultClass {
    @Field(() => [TClass])
    items: T[];

    @Field(() => Int)
    total: number;

    // below should match PageInput fields
    @Field(() => Int)
    page: number;

    @Field(() => Int)
    pageSize: number;

    @Field(() => String, { nullable: true })
    search?: string;

    @Field(() => [String], { nullable: true })
    sort?: string[];

    @Field(() => [String], { nullable: true })
    filters?: string[];
  }
  return PageResultClass;
}
