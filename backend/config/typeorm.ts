import { ConnectionOptions } from "typeorm";
import { databaseUrl } from "./pg";

export const DefaultConnection: ConnectionOptions = {
  type: "postgres",
  name: "default",
  url: databaseUrl,
  synchronize: true,
  dropSchema: false,
  logging: true,
  entities: [__dirname + "/../src/models/**/*.ts"]
};
