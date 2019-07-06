import { Request, Response } from "express";
import { User } from "./models/User";

export interface Context {
  req: Request & {
    session: Request["session"] & {
      userId: User["id"];
      userRole: User["role"];
    };
  };
  res: Response;
}
