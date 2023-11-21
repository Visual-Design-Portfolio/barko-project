import { IUserExtended, IUserRepository } from ".";
import { ICreateUserDTO } from "../dto/user";
import { IUser, IUserModel } from "../schemas/user_info";

export default class UserRepository implements IUserRepository {
  constructor(private User: IUserModel) {}

  public create: IUserRepository["create"] = async (user) => {
    return (await this.User.create({
      ...user,
      registeredAt: new Date(),
    })) as IUser;
  };
  public findByEmail: IUserRepository["findByEmail"] = async (email) => {
    return await this.User.findOne({ email })
      .select("-password -registerdAt")
      .lean<IUserExtended>()
      .exec();
  };

  public findById: IUserRepository["findById"] = async (id) => {
    return await this.User.findById(id)
      .select("-password -registerdAt")
      .lean<IUserExtended>()
      .exec();
  };
}
