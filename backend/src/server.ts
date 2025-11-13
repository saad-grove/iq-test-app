import express, { Request, Response } from "express";
import cors from "cors";
import { ENV } from "./config/env.config";
import { connectMongoDB } from "./config/db.config";
import mainRouter from "./routes/index.route";

const app = express();
const PORT = ENV.port;

app.use(express.json());
app.use(cors());

connectMongoDB();

app.use("/api", mainRouter);

app.get("/", (_req: Request, res: Response) => {
  res.json({ server: true });
});

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
