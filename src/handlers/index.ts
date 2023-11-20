import { RequestHandler } from "express";
import { ICreateUserDTO, IUserDTO } from "../dto/user";
import { IErrorDTO } from "../dto/error";
import { ICredentialDTO, ILoginDTO } from "../dto/auth";
import { IMessageDTO } from "../dto/message";
import { AuthStatus } from "../middleware/jwt";

export interface IUserHandler {
  registration: RequestHandler<{}, IUserDTO | IErrorDTO, ICreateUserDTO>;
  login: RequestHandler<{}, ICredentialDTO | IErrorDTO, ILoginDTO>;
  logout: RequestHandler<{}, IMessageDTO, undefined, undefined, AuthStatus>;
  findByEmail: RequestHandler<{ email: string }, IUserDTO | IErrorDTO>;
  findById: RequestHandler<
    {},
    IUserDTO | IErrorDTO,
    unknown,
    undefined,
    AuthStatus
  >;
}
