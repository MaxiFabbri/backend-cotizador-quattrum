import { config } from "dotenv";

const path = "./.env.dev";
config({ path }); 

const envUtil = {
  PORT: process.env.PORT,
  MONGO_LINK: process.env.MONGO_LINK,
  SECRET_KEY: process.env.SECRET_KEY,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  BASE_URL: process.env.BASE_URL,
  COOKIES_DOMAIN: process.env.COOKIE_DOMAIN,
};

export default envUtil;