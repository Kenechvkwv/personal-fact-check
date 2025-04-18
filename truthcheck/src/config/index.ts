import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number | string;
  database_url?: string;
  google_factcheck_api_key?: string;
  google_factcheck_url: string;
  jwt_secret: string;
  expires_in: string;
}

//ensure JWT_SECRET is defined
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment");
}

const config: Config = {
  port: process.env.PORT || 5000,
  database_url: process.env.MONGODB_URI,
  google_factcheck_api_key: process.env.API_KEY,
  google_factcheck_url:
    "https://factchecktools.googleapis.com/v1alpha1/claims:search",

  // ✅ Add fallback for JWT secret
  jwt_secret: process.env.JWT_SECRET,
  expires_in: process.env.JWT_EXPIRES_IN as string,
};

export default config;
