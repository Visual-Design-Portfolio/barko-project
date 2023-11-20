import { PrismaClient, User_info } from "@prisma/client";
import { IUserExtended, IUserRepository } from ".";
import { ICreateUserDTO } from "../dto/user";

export default class UserRepository implements IUserRepository {
  private prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async create(user: ICreateUserDTO): Promise<IUserExtended> {
    return await this.prisma.user_info.create({
      data: { ...user, registeredAt: new Date() },
      select: {
        id: true,
        email: true,
        username: true,
        registeredAt: true,
      },
    });
  }

  public async findByEmail(email: string): Promise<User_info> {
    return await this.prisma.user_info.findUniqueOrThrow({
      where: { email },
    });
  }

  public async findById(id: string): Promise<IUserExtended> {
    return await this.prisma.user_info.findUniqueOrThrow({
      select: {
        id: true,
        email: true,
        username: true,
        registeredAt: true,
      },
      where: { id },
    });
  }
}
