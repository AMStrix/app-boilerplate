// tslint:disable-next-line
require("dotenv").config();

const { URL, PORT, SESSION_NAME, SECRET_KEY, NODE_ENV } = process.env;

if (!SECRET_KEY) {
  throw Error("config: SECRET_KEY must be set");
}

export const serverURL = PORT ? URL + ":" + PORT : URL;
export const serverPORT = PORT;
export const sessionName = SESSION_NAME || "sessionid";
export const sessionSecret = SECRET_KEY;
export const env = NODE_ENV || "production";
