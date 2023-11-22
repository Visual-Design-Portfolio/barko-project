import mongoose from "mongoose";

export interface IUserDTO {
  _id: mongoose.Types.ObjectId;
  email: string;
  username: string;
  registeredAt: Date;
}

export interface ICreateUserDTO {
  email: string;
  username: string;
  password: string;
}
