import { Client } from "pg";
import * as session from "express-session";
import * as connectPgSimple from "connect-pg-simple";
import { databaseUrl } from "./pg";
import { sessionName, sessionSecret, env } from "./default";

const SESSION_TABLE = "session";
const pgSession = connectPgSimple(session);

export const sessionConfig = {
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    secure: env === "production"
  },
  name: sessionName!,
  resave: false,
  saveUninitialized: false,
  secret: sessionSecret!,
  store: new pgSession({
    conString: databaseUrl
  })
};

const sessionTableSql = `
CREATE TABLE IF NOT EXISTS "${SESSION_TABLE}" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
`;

const initializeSessionTable = async () => {
  const client = new Client(databaseUrl);
  await client.connect();
  try {
    await client.query(`SELECT count(*) FROM ${SESSION_TABLE}`);
    console.log("config: Session table exists");
  } catch (error) {
    console.log("config: Creating session table...");
    await client.query(sessionTableSql);
    console.log("config: Created session table");
  }
  client.end();
};
initializeSessionTable();
