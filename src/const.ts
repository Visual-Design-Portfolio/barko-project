export const { JWT_SECRET: ENV_JWT_SECRET } = process.env;
export const { DATABASE_URL: ENV_DATABASE_URL } = process.env;

if (!ENV_JWT_SECRET)
  throw new Error("JWT_SECRET environment variable is not configured");

export const JWT_SECRET = ENV_JWT_SECRET;
export const DATABASE_URL = ENV_DATABASE_URL;
