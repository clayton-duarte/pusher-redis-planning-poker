import { withIronSession, SessionOptions } from "next-iron-session";
import { NextApiHandler } from "next";

export default (handler: NextApiHandler) => {
  const options: SessionOptions = {
    cookieName: "planning-poker-session",
    password: process.env.SESSION_SECRET,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  };
  return withIronSession(handler, options);
};
