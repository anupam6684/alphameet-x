import dotenv from "dotenv";

dotenv.config();
const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 8080,

  MONGO_URI: process.env.MONGO_URI2,

  JWT_SECRET: process.env.JWT_SECRET || "",

  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",
};

export default env;
