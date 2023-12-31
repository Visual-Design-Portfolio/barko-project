import {
  ICreatePortfolioDTO,
  IGetPortfolioDTO,
  IPortfolioDTO,
  IUpdatePortfolioDTO,
} from "../dto/portfolio";
import { ICreateUserDTO } from "../dto/user";
import { IPortfolio, IPortfolioModel } from "../schemas/portfolio_info";
import { IUser, IUserModel } from "../schemas/user_info";

export interface IUserRepository {
  create(user: ICreateUserDTO): Promise<ICreateUser>;
  findByEmail(email: string): Promise<IFindEmailForLogin | null>;
  findById(_id: string): Promise<IUserInfo | null>;
  updatePortfolio(
    userId: string,
    portfolioId: string
  ): Promise<IUserInfo | null>;
}

export interface IUserExtended
  extends Pick<
    IUser,
    "_id" | "email" | "username" | "password" | "registeredAt"
  > {}

export interface IUserInfo extends Omit<IUser, "password"> {}
export interface ICreateUser extends Omit<IUser, "id" | "registerdAt"> {}
export interface IFindEmailForLogin extends Omit<IUser, "portfolios"> {}

export interface IPortfolioRepository {
  getPortfolioAll(): Promise<IPortfolioDTO[]>;
  getPortfolioById(_id: IGetPortfolioDTO): Promise<IPortfolioDTO | null>;
  getPortfolioByUserId(userId: string): Promise<IPortfolioDTO[]>;
  create(
    ownerId: string,
    portfolio: ICreatePortfolioDTO
  ): Promise<IPortfolioDTO>;
  update(
    _id: string,
    portfolio: IUpdatePortfolioDTO
  ): Promise<IPortfolioDTO | null>;
  delete(_id: string): Promise<IPortfolioDTO>;
}

export interface IGetPortfolio extends IPortfolioDTO {}
export interface IUpdatePortfolio extends IUpdatePortfolioDTO {}
