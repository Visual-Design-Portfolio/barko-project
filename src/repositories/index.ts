import { User_info } from "@prisma/client";
import { ICreateUserDTO, IUserDTO } from "../dto/user";

export interface IUserRepository {
  create(user: ICreateUserDTO): Promise<IUserExtended>;
  findByEmail(email: string): Promise<User_info>;
  findById(id: string): Promise<IUserExtended>;
}

export interface IUserExtended
  extends Pick<User_info, "id" | "email" | "username" | "registeredAt"> {}
