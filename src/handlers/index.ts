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
import { IPortfolio } from "../schemas/portfolio_info";

export interface ID {
  _id: mongoose.Types.ObjectId;
}

export interface IUserHandler {
  registration: RequestHandler<{}, IUserDTO | IErrorDTO, ICreateUserDTO>;
  login: RequestHandler<{}, ICredentialDTO | IErrorDTO, ILoginDTO>;
  logout: RequestHandler<{}, IMessageDTO, undefined, undefined, AuthStatus>;
  findByEmail: RequestHandler<{ email: string }, IUserDTO | IErrorDTO>;
  findById: RequestHandler<
    { _id: string },
    IUserDTO | IErrorDTO,
    undefined,
    undefined,
    AuthStatus
  >;
  updatePortfolio: RequestHandler<
    { userId: string; portfolioId: string },
    IUserDTO | IErrorDTO,
    undefined,
    { userId: string },
    AuthStatus
  >;
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
