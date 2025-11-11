import express, { Request, Response } from "express";

const app = express();

app.get("/", (_req: Request, res: Response) => {
  res.json({ server: true });
});

app.listen(5000, () => console.log(`Server running on PORT: 5000`));
