import { Router } from "express";
import * as userController from "../controllers/user.controller";
import protectRoute from "../middleware/auth.middleware";

const userRouter = Router();

userRouter.post("/register", userController.registerUserController);
userRouter.post("/login", userController.loginUserController);

userRouter.get("/profile", protectRoute, userController.getProfileController);

export default userRouter;
