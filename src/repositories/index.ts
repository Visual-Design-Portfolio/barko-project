import {
  ICreatePortfolioDTO,
  IGetPortfolioDTO,
  IPortfolioDTO,
  IUpdatePortfolioDTO,
} from "../dto/portfolio";
import { ICreateUserDTO } from "../dto/user";
import { IUser } from "../schemas/user_info";

export interface IUserRepository {
  create(user: ICreateUserDTO): Promise<ICreateUser>;
  findByEmail(email: string): Promise<IFindEmailForLogin | null>;
  findById(id: string): Promise<IFindUser | null>;
}

export interface IUserExtended
  extends Pick<
    IUser,
    "_id" | "email" | "username" | "password" | "registeredAt"
  > {}

export interface IUserInfo extends Omit<IUser, "password"> {}
export interface ICreateUser extends Omit<IUser, "_id" | "registerdAt"> {}
export interface IFindUser extends Omit<IUser, "password"> {}
export interface IFindEmailForLogin extends Omit<IUser, "portfolio_info"> {}

export interface IPortfolioRepository {
  getAll(): Promise<IPortfolioDTO[]>;
  getById(_id: IGetPortfolioDTO): Promise<IGetPortfolio | null>;
  create(id: string, portfolio: ICreatePortfolioDTO): Promise<IPortfolioDTO>;
  // update(
  //   _id: string,
  //   portfolio: IUpdatePortfolioDTO
  // ): Promise<IPortfolioDTO | null>;
  // delete(id: string): Promise<IPortfolioDTO | null>;
}

export interface IGetPortfolio extends IPortfolioDTO {}

// export interface ICreatePortfolio
//   extends Omit<IPortfolio, "_id" | "createdAt" | "updatedAt"> {}
// export interface IUpdatePortfolio
//   extends Omit<IPortfolio, "_id" | "createdAt" | "updatedAt"> {}
