import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as session from "express-session";
import { ApolloServer } from "apollo-server-express";
import * as cors from "cors";

import { DefaultConnection } from "../config/typeorm";
import { createSchema } from "./createSchema";

import { serverURL, serverPORT } from "../config/default";
import { sessionConfig } from "../config/session";
import { Context } from "./context.interface";

const startServer = async () => {
  await createConnection(DefaultConnection);

  const schema = await createSchema();

  const app = express();

  app.use(
    cors({
      origin: ["http://localhost:3000", "http://localhost:3500"],
      credentials: true
    }),
    session(sessionConfig)
  );

  const server = new ApolloServer({
    schema,
    context: ({ req, res }: Context) => ({
      req,
      res
    })
  });

  server.applyMiddleware({
    app,
    path: "/",
    cors: false
  });

  app.listen({ port: serverPORT }, () =>
    console.log(`server started: ${serverURL}${server.graphqlPath} ..`)
  );
};

startServer().catch(error => {
  console.error(error);
});
