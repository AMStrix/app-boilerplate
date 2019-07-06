import * as nodemailer from "nodemailer";
import * as nodemailerSendgrid from "nodemailer-sendgrid";
// tslint:disable-next-line
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

if (!SENDGRID_API_KEY) {
  console.warn("config: SENDGRID_API_KEY is not set, will not send emails");
}

export const transporter = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey: SENDGRID_API_KEY
  })
);
