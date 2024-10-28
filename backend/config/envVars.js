// envVars.js
import dotenv from "dotenv";

dotenv.config();

export const ENV_VARS = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
  API_KEY: process.env.API_KEY,
  TMDB_API_TOKEN: process.env.TMDB_API_TOKEN,
};

console.log("JWT Secret:", ENV_VARS.JWT_SECRET); // Check if this is logged correctly
