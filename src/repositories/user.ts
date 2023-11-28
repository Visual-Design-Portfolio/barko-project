import { string } from "yup";
import {
  IFindEmailForLogin,
  IFindUser,
  IUserExtended,
  IUserInfo,
  IUserRepository,
} from ".";
import User, { IUser, IUserModel } from "../schemas/user_info";
import { Types } from "mongoose";

export default class UserRepository implements IUserRepository {
  constructor(private User: IUserModel) {
    this.User = User;
  }

  public create: IUserRepository["create"] = async (user) => {
    return await this.User.create({
      email: user.email,
      username: user.username,
      password: user.password,
      registeredAt: new Date(),
    });
  };

  public findByEmail: IUserRepository["findByEmail"] = async (email) => {
    return await this.User.findOne({ email })
      .select("-registerdAt")
      .lean<IFindEmailForLogin>()
      .exec();
  };

  public findById: IUserRepository["findById"] = async (_id) => {
    return await this.User.findById(_id)
      .select("-registerdAt")
      .populate("portfolios", "portfolio")
      .lean<IFindUser>()
      .exec();
  };

  public findByUser: IUserRepository["findByUser"] = async (userId) => {
    const user = await this.User.findById(userId)
      .select("-registeredAt")
      .lean<IFindUser>()
      .exec();
    return user;
  };

  public updatePortfolio: IUserRepository["updatePortfolio"] = async (
    userId,
    portfolioId
  ) => {
    const result = await this.User.findById(userId);

    if (result) {
      const newPortfolioId = new Types.ObjectId(portfolioId);
      result.portfolios = [...(result.portfolios || []), newPortfolioId];
      result.save;
    }

    return result;
  };
}
