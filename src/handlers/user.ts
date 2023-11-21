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
import { IMessageDTO } from "../dto/message";
import User from "../schemas/user_info";
import { number, string } from "yup";

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
      const result = await this.repo.findById(res.locals.user.id);
      if (result == null) throw new Error("something byId");

      return res.status(200).json({ message: "Done" }).end();
    } catch (error) {
      console.error(error);

      return res.status(500).json({ message: "ID not found" });
    }
  };

  public findByEmail: RequestHandler<{ email: string }, IUserDTO | IErrorDTO> =
    async (req, res) => {
      try {
        const result = await this.repo.findByEmail(req.params.email);
        if (result == null) throw new Error("something");

        return res
          .status(200)
          .json({
            // id: result.id
            email: result.email,
            username: result.username,
            registeredAt: result.registeredAt,
          })
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
        const result = await this.repo.findByEmail(email);
        if (result == null) throw new Error("Email not found");
        const {
          email: registerdEmail,
          username: registeredUsername,
          registeredAt,
          password: password,
        } = result;

        console.log(result);

        if (!verifyPassword(plainPassword, password))
          throw new Error("Username or Password is wrong");

        const accessToken = sign({ at(_id) {} }, JWT_SECRET, {
          algorithm: "HS512",
          expiresIn: "12h",
          issuer: "Visual-Portfolio-api",
          subject: "user-credential",
        });
        console.log(accessToken);
        return res.status(200).json({ accessToken }).end();
      } catch (error) {
        if (error instanceof Error) {
          return res.status(404).json({ message: error.message });
        }
        return res.status(400).json({ message: "Not found" });
      }
    };

  public registration: RequestHandler<
    {},
    IUserDTO | IErrorDTO,
    ICreateUserDTO
  > = async (req, res) => {
    const { email, username, password: plainPassword } = req.body;
    const emailRegex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (!emailRegex.test(email) || email.length < 5)
      return res.status(400).json({ message: "email is invalid" });
    if (typeof username !== "string" || username.length < 3)
      return res.status(400).json({ message: "username is invalid" });
    if (typeof plainPassword !== "string" || plainPassword.length < 8)
      return res.status(400).json({ message: "password is invalid" });

    try {
      const {
        email: registerdEmail,
        username: registeredUsername,
        registeredAt,
      } = await this.repo.create({
        email,
        username,
        password: hashPassword(plainPassword),
      });
      console.log(email, username, plainPassword);
      console.log(registerdEmail, registeredUsername);

      return res
        .status(201)
        .json({
          email: registerdEmail,
          username: registeredUsername,
          registeredAt: registeredAt,
          message: "Register Succuess",
        })
        .end();
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Register fail" });
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
