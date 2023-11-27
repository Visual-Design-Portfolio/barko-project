import mongoose from "mongoose";
export interface IUser {
  _id: mongoose.Types.ObjectId;
  email: string;
  username: string;
  password: string;
  registeredAt: Date;
  portfolios: mongoose.Types.ObjectId[];
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    registeredAt: {
      type: Date,
      default: Date.now,
    },
    portfolios: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Portfolio",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
export type IUserModel = typeof User;
