import { Router } from "express";
import * as userController from "../controllers/user.controller";
import protectRoute from "../middleware/auth.middleware";

const userRouter = Router();

userRouter.post("/auth/register", userController.registerUserController);
userRouter.post("/auth/login", userController.loginUserController);

userRouter.get(
  "/auth/profile",
  protectRoute,
  userController.getProfileController
);

export default userRouter;
