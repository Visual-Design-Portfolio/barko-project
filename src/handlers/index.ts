import { RequestHandler } from "express";
import mongoose from "mongoose";
import { ICredentialDTO, ILoginDTO } from "../dto/auth";
import { IErrorDTO } from "../dto/error";
import { IMessageDTO } from "../dto/message";
import {
  ICreatePortfolioDTO,
  IPortfolioDTO,
  IUpdatePortfolioDTO,
} from "../dto/portfolio";
import { ICreateUserDTO, IUserDTO } from "../dto/user";
import { AuthStatus } from "../middleware/jwt";

export interface ID {
  _id: mongoose.Types.ObjectId;
}

export interface IUserHandler {
  registration: RequestHandler<{}, IUserDTO | IErrorDTO, ICreateUserDTO>;
  login: RequestHandler<{}, ICredentialDTO | IErrorDTO, ILoginDTO>;
  logout: RequestHandler<{}, IMessageDTO, undefined, undefined, AuthStatus>;
  findByEmail: RequestHandler<{ email: string }, IUserDTO | IErrorDTO>;
  findById: RequestHandler<{ _id: string }, IUserDTO | IErrorDTO>;
  updatePortfolio: RequestHandler<
    { userId: string; portfolioId: string },
    IUserDTO | IErrorDTO,
    undefined,
    { userId: string },
    AuthStatus
  >;
  whoami: RequestHandler<
    {},
    IUserDTO | IErrorDTO,
    undefined,
    undefined,
    AuthStatus
  >
}

export interface IPortfolioHandler {
  getPortfolioAll: RequestHandler<{}, IPortfolioDTO[] | IErrorDTO>;
  getPortfolioById: RequestHandler<ID, IPortfolioDTO | IErrorDTO>;
  getPortfolioByUserId: RequestHandler<
    { userId: string },
    IPortfolioDTO[] | IErrorDTO,
    undefined,
    undefined,
    AuthStatus
  >;

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
