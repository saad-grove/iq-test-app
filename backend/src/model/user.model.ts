import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    profilePicture: {
      type: String,
    },
  },
  { timestamps: true }
);

const user_model = mongoose.model("User", userSchema);

export default user_model;
