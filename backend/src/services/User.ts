import bcrypt from "bcryptjs";
import { ENV } from "../config/env.config";
import user_model from "../model/user.model";
import { generateToken } from "../lib/generate-token";

class User {
  private userModel;

  constructor(userModel = user_model) {
    this.userModel = userModel;
  }

  public async registerUser(name: string, email: string, password: string) {
    const existing = await this.userModel.findOne({ email });
    if (existing) throw new Error("User already exist");

    const username = email.split("@")[0].replace(" ", "").trim();
    const profilePicture = `${ENV.pfpUrl}${name}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      username,
      profilePicture,
    });

    return user;
  }

  public async loginUser(username: string, email: string, password: string) {
    const user = await this.userModel.findOne({
      $or: [{ email }, { username }],
    });
    if (!user) throw new Error("User do not exist");

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new Error("Password is incorrect");

    const token = generateToken(user._id.toString());

    return { token, user };
  }

  public async getProfile(userId: string) {
    return await this.userModel.findById(userId).select("-password");
  }
}

export default User;
