import mongoose from "mongoose";
import { IUserDTO } from "../dto/user";
import { Schema, string } from "yup";
import { ObjectId } from "bson";

export interface IUser {
  // _id: mongoose.Types.ObjectId;
  email: string;
  username: string;
  password: string;
  registeredAt: Date;
  portfolio_info: mongoose.Types.ObjectId[];
}

const userSchema = new mongoose.Schema({
  // _id: {
  //   type: mongoose.Types.ObjectId,
  //   require: true,
  // },
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
  portfolio_info: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "portfolio_info",
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
export type IUserModel = typeof User;
