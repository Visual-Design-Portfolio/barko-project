import { ICreatePortfolioDTO, IPortfolioDTO } from "../dto/portfolio";
import { ICreateUserDTO } from "../dto/user";
import { IPortfolio } from "../schemas/portfolio_info";
import { IUser } from "../schemas/user_info";

export interface IUserRepository {
  create(user: ICreateUserDTO): Promise<IUserExtended>;
  findByEmail(email: string): Promise<IUserExtended | null>;
  findById(id: string): Promise<IUserExtended | null>;
}

export interface IUserExtended
  extends Pick<
    IUser,
    "_id" | "email" | "username" | "password" | "registeredAt"
  > {}

export interface IPortfolioRepository {
  getAll(): Promise<IPortfolioDTO[]>;
  create(id: string, portfolio: ICreatePortfolioDTO): Promise<IPortfolio>;
}

export interface IPortfolios extends IPortfolio {
  User: IUserExtended;
}
