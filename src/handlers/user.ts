import { RequestHandler } from "express";
import { IUserHandler } from ".";
import { IUserRepository } from "../repositories";
import { ICredentialDTO, ILoginDTO } from "../dto/auth";
import { IErrorDTO } from "../dto/error";
import { ICreateUserDTO, IUserDTO } from "../dto/user";
import { AuthStatus } from "../middleware/jwt";
import { hashPassword, verifyPassword } from "../utils/bcrypt";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { JWT_SECRET } from "../const";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { IMessageDTO } from "../dto/message";

export default class UserHandler implements IUserHandler {
  private repo: IUserRepository;
  constructor(repo: IUserRepository) {
    this.repo = repo;
  }
  public findById: RequestHandler<
    {},
    IUserDTO | IErrorDTO,
    unknown,
    undefined,
    AuthStatus
  > = async (req, res) => {
    try {
      const { registeredAt, ...other } = await this.repo.findById(
        res.locals.user.id
      );

      return res
        .status(200)
        .json({ ...other, registeredAt })
        .end();
    } catch (error) {
      console.error(error);

      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  public findByEmail: RequestHandler<{ email: string }, IUserDTO | IErrorDTO> =
    async (req, res) => {
      try {
        const { password, registeredAt, ...userInfo } =
          await this.repo.findByEmail(req.params.email);

        return res
          .status(200)
          .json({ ...userInfo, registeredAt: registeredAt })
          .end();
      } catch (error) {
        console.error(error);

        return res.status(404).json({ message: "User not found" });
      }
    };

  public login: RequestHandler<{}, ICredentialDTO | IErrorDTO, ILoginDTO> =
    async (req, res) => {
      const { email, password: plainPassword } = req.body;
      try {
        const { password, id } = await this.repo.findByEmail(email);

        if (!verifyPassword(plainPassword, password))
          throw new Error("Username or Password is wrong");

        const accessToken = sign({ id }, JWT_SECRET, {
          algorithm: "HS512",
          expiresIn: "12h",
          issuer: "Visual-Portfolio-api",
          subject: "user-credential",
        });
        return res.status(200).json({ accessToken }).end();
      } catch (error) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }
    };

  public registration: RequestHandler<
    {},
    IUserDTO | IErrorDTO,
    ICreateUserDTO
  > = async (req, res) => {
    const { email, username, password: plainPassword } = req.body;
    const emailRegex = new RegExp(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    );

    if (!emailRegex.test(email) || email.length > 3)
      return res.status(400).json({ message: "email is invalid" });
    if (typeof username !== "string" || username.length > 3)
      return res.status(400).json({ message: "username is invalid" });
    if (typeof plainPassword !== "string" || plainPassword.length < 5)
      return res.status(400).json({ message: "password is invalid" });

    try {
      const {
        id: registeredId,
        email: registerdEmail,
        username: registeredUsername,
        registeredAt,
      } = await this.repo.create({
        email,
        username,
        password: hashPassword(plainPassword),
      });

      return res
        .status(201)
        .json({
          id: registeredId,
          email: registerdEmail,
          username: registeredUsername,
          registeredAt: registeredAt,
        })
        .end();
    } catch (error) {
      return res.status(401).json({ message: "Name is invalid" });
    }
  };

  public logout: RequestHandler<
    {},
    IMessageDTO,
    undefined,
    undefined,
    AuthStatus
  > = async (req, res) => {
    const authHeader = req.header("Authorization");
    if (!authHeader)
      return res
        .status(400)
        .json({ message: "Authorization is expected" })
        .end();

    const token = authHeader.replace("Bearer ", "").trim();

    const decoded = verify(token, JWT_SECRET) as JwtPayload;

    const exp = decoded.exp;
  };
}
