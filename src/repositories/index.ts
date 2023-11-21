import { ICreateUserDTO, IUserDTO } from "../dto/user";
import { IUser } from "../schemas/user_info";

export interface IUserRepository {
  create(user: ICreateUserDTO): Promise<IUserExtended>;
  findByEmail(email: string): Promise<IUserExtended | null>;
  findById(id: string): Promise<IUserExtended | null>;
}

export interface IUserExtended
  extends Pick<IUser, "email" | "username" | "registeredAt"> {}
