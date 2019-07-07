import { Resolver, Query, Arg } from "type-graphql";

import { User } from "../../models/User";
import { PageInput } from "../../types/pagination";
import { UserPageResult } from "../../types/user";

@Resolver()
export class UsersResolver {
  @Query(() => UserPageResult)
  async users(@Arg("page") page: PageInput): Promise<UserPageResult> {
    // const usersQuery = await User.createQueryBuilder("user");

    const total = await User.count(/* TODO: findManyOptions */);

    const skip = page.pageSize * (page.page - 1);
    const take = page.pageSize;

    const items = await User.find({
      order: { createdAt: "DESC" },
      skip,
      take
    });

    return {
      ...page,
      items,
      total
    };
  }
}
