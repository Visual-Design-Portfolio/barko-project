import { RequestHandler } from "express";
import { ICreateUserDTO, IUserDTO } from "../dto/user";
import { IErrorDTO } from "../dto/error";
import { ICredentialDTO, ILoginDTO } from "../dto/auth";
import { IMessageDTO } from "../dto/message";
import { AuthStatus } from "../middleware/jwt";
import {
  ICreatePortfolioDTO,
  IPortfolioDTO,
  IUpdatePortfolioDTO,
} from "../dto/portfolio";
import mongoose from "mongoose";

export interface ID {
  _id: mongoose.Types.ObjectId;
}

export interface IUserHandler {
  registration: RequestHandler<{}, IUserDTO | IErrorDTO, ICreateUserDTO>;
  login: RequestHandler<{}, ICredentialDTO | IErrorDTO, ILoginDTO>;
  logout: RequestHandler<{}, IMessageDTO, undefined, undefined, AuthStatus>;
  findByEmail: RequestHandler<{ email: string }, IUserDTO | IErrorDTO>;
  // findById: RequestHandler<
  //   {},
  //   IUserDTO | IErrorDTO,
  //   unknown,
  //   undefined,
  //   AuthStatus
  // >;
}

export interface IPortfolioHandler {
  getPortfolioAll: RequestHandler<{}, IPortfolioDTO[] | IErrorDTO>;
  getPortfolioById: RequestHandler<ID, IPortfolioDTO | IErrorDTO>;
  create: RequestHandler<
    {},
    IPortfolioDTO | IErrorDTO,
    ICreatePortfolioDTO,
    undefined,
    AuthStatus
  >;
  update: RequestHandler<
    ID,
    IPortfolioDTO | IErrorDTO,
    IUpdatePortfolioDTO,
    undefined,
    AuthStatus
  >;
  delete: RequestHandler<
    ID,
    IPortfolioDTO | string | IErrorDTO,
    undefined,
    undefined,
    AuthStatus
  >;
}
