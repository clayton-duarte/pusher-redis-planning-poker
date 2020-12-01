import Providers from "next-auth/providers";
import NextAuth from "next-auth";

const options = {
  debug: process.env.NODE_ENV === "development",
  providers: [
    Providers.Google({
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      clientId: process.env.GOOGLE_CLIENT_ID,
      authorizationUrl:
        "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
    }),
  ],
};

export default (req, res) => NextAuth(req, res, options);
