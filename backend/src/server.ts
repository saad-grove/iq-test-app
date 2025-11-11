import express, { Request, Response } from "express";
import { ENV } from "./config/env.config";

const app = express();
const PORT = ENV.port;

app.get("/", (_req: Request, res: Response) => {
  res.json({ server: true });
});

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
