import "dotenv/config";

export const ENV = {
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || "sameoldtreva",
  mongoUrl: process.env.DATABASE_URL,
  pfpUrl: process.env.PFP_URL,
};
