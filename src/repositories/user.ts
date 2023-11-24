// import { string } from "yup";
import {
  IFindEmailForLogin,
  IFindUser,
  IUserExtended,
  IUserRepository,
} from ".";
import { IUserModel } from "../schemas/user_info";

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

  public findById: IUserRepository["findById"] = async (id) => {
    return await this.User.findById(id)
      .select("-registerdAt")
      .lean<IFindUser>()
      .exec();
  };
}
