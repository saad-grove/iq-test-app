import { Request, Response } from "express";
import User from "../services/User";

const userService = new User();

export const registerUserController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    console.log("Missing required fields");
    res.status(404).json({ message: "Missing required fields" });
    return;
  }

  if (password.length < 8) {
    console.log("Password should not be less than 8 characters");
    res
      .status(404)
      .json({ message: "Password should not be less than 8 characters" });
    return;
  }

  try {
    const user = await userService.registerUser(name, email, password);
    res.status(201).json({ message: "User registered", data: user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!email || !password) {
    console.log("Missing required fields");
    res.status(404).json({ message: "Missing required fields" });
    return;
  }

  if (password.length < 8) {
    console.log("Password should not be less than 8 characters");
    res
      .status(404)
      .json({ message: "Password should not be less than 8 characters" });
    return;
  }

  try {
    const { token, user } = await userService.loginUser(
      username,
      email,
      password
    );
    res
      .status(200)
      .json({ message: "User logged in", data: user, token: token });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getProfileController = async (req: Request, res: Response) => {
  try {
    if (!(req as any).user) {
      res.status(401).json({ message: "Unauthorized: No user found" });
      return;
    }
    const user = await userService.getProfile((req as any).user._id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
