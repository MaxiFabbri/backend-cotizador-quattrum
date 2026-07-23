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
  FRONTEND_URL: process.env.FRONTEND_URL,
  COOKIES_DOMAIN: process.env.COOKIE_DOMAIN,
  XUBIO_CLIENT_ID: process.env.XUBIO_CLIENT_ID,
  XUBIO_SECRET_ID: process.env.XUBIO_SECRET_ID,
  XUBIO_BASE_URL: process.env.XUBIO_BASE_URL,
};

export default envUtil;