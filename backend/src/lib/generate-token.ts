import jwt from "jsonwebtoken";
import { ENV } from "../config/env.config";

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, ENV.jwtSecret, { expiresIn: "7d" });
};
