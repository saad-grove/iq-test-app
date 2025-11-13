import { Router } from "express";
import userRouter from "./user.route";

const mainRouter = Router();

mainRouter.use("/users", userRouter);

export default mainRouter;
