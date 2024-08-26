require("dotenv").config();

module.exports = {
  DATABASE_URL: process.env.DATABASE_URL,
  SECRET: process.env.SECRET,
  BUCKET_NAME: process.env.BUCKET_NAME,
  BUCKET_REGION: process.env.BUCKET_REGION,
  ACCESS_KEY: process.env.ACCESS_KEY,
  SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
};
