// tslint:disable-next-line
require("dotenv").config();

const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
  throw Error("config: DATABASE_URL required");
}

export const databaseUrl = DATABASE_URL;
