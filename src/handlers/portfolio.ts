import { RequestHandler } from "express";
import { ID, IPortfolioHandler } from ".";
import { IErrorDTO } from "../dto/error";
import {
  IPortfolioDTO,
  ICreatePortfolioDTO,
  IUpdatePortfolioDTO,
} from "../dto/portfolio";
import { AuthStatus } from "../middleware/jwt";
import { IPortfolioRepository } from "../repositories";

export default class PortfolioHandler implements IPortfolioHandler {
  private repo: IPortfolioRepository;
  constructor(repo: IPortfolioRepository) {
    this.repo = repo;
  }

  public getAll: RequestHandler<{}, IPortfolioDTO[] | IErrorDTO> = async (
    req,
    res
  ) => {
    try {
      const result = await this.repo.getAll();

      return res.status(200).json(result).end();
    } catch (error) {
      console.error(error);
      if (error instanceof URIError)
        return res.status(400).json({ message: `${error}` });

      res.status(500).json({ message: "Internal server error" }).end;
    }
  };

  public getById: RequestHandler<ID, IPortfolioDTO | IErrorDTO> = async (
    req,
    res
  ) => {
    try {
      const result = await this.repo.getById(req.params._id);
      if (result === null) throw new Error("Not found portfolio ID");

      return res.status(200).json(result).end();
    } catch (error) {
      console.error(error);

      return res.status(404).json({ message: "Portfolio not found" });
    }
  };

  public create: RequestHandler<
    {},
    IPortfolioDTO | IErrorDTO,
    ICreatePortfolioDTO,
    undefined,
    AuthStatus
  > = async (req, res) => {
    const {
      name,
      ownerName,
      picture,
      education,
      workExperience,
      project,
      skill,
    } = req.body;

    if (typeof name !== "string" || name.length === 0)
      return res.status(400).json({ message: "Name is invalid" });
    if (typeof ownerName !== "string" || ownerName.length === 0)
      return res.status(400).json({ message: "ownerName is invalid" });

    const createPortfolioData = {
      name,
      ownerName,
      picture,
      education,
      workExperience,
      project,
      skill,
    };

    try {
      const result = await this.repo.create(
        res.locals.user.userId,
        createPortfolioData
      );

      const returnResult: IPortfolioDTO = {
        _id: result._id,
        name: result.name,
        ownerName: result.ownerName,
        picture: result.picture,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
        education: result.education,
        workExperience: result.workExperience,
        project: result.project,
        skill: result.skill,
        userInfo: result.userInfo,
      };

      return res.status(201).json(returnResult).end();
    } catch (error) {
      console.error(error);
      if (error instanceof URIError)
        return res.status(400).json({ message: `${error}` });

      return res.status(400).json({ message: "Can't create portfolio" }).end();
    }
  };

  // public update: RequestHandler<
  //   ID,
  //   IPortfolioDTO | IErrorDTO,
  //   IUpdatePortfolioDTO,
  //   undefined,
  //   AuthStatus
  // > = async (req, res) => {
  //   const {
  //     name,
  //     ownerName,
  //     picture,
  //     education,
  //     workExperience,
  //     project,
  //     skill,
  //   } = req.body;

  //   if (typeof name !== "string" || name.length === 0)
  //     return res.status(400).json({ message: "Name is invalid" });
  //   if (typeof ownerName !== "string" || ownerName.length === 0)
  //     return res.status(400).json({ message: "ownerName is invalid" });

  //   const updatePortfolioData = {
  //     name,
  //     ownerName,
  //     picture,
  //     education,
  //     workExperience,
  //     project,
  //     skill,
  //   };
  //   console.log(updatePortfolioData);

  //   try {
  //     const result = await this.repo.update(
  //       res.locals.user.userId,
  //       updatePortfolioData
  //     );
  //     console.log(result);
  //     if (result === null) throw new Error("Not found ID");

  //     const returnResult: IPortfolioDTO = {
  //       _id: result._id._id,
  //       name: result.name,
  //       ownerName: result.ownerName,
  //       picture: result.picture,
  //       createdAt: result.createdAt,
  //       updatedAt: result.updatedAt,
  //       education: result.education,
  //       workExperience: result.workExperience,
  //       project: result.project,
  //       skill: result.skill,
  //       userInfo: result.userInfo,
  //     };
  //     console.log(returnResult);

  //     return res.status(201).json(returnResult).end();
  //   } catch (error) {
  //     if (error instanceof URIError)
  //       return res.status(400).json({ message: `${error}` });

  //     return res
  //       .status(400)
  //       .json({ message: `${error}` })
  //       .end();
  //   }
  // };

  // public delete: RequestHandler<
  //   ID,
  //   IPortfolioDTO | string | IErrorDTO,
  //   undefined,
  //   undefined,
  //   AuthStatus
  // > = async (req, res) => {
  //   try {
  //     const { userInfo._id } = await this.repo.getById(req.params._id);

  //     if (userInfo._id !== res.locals.user.userId)
  //       return res
  //         .status(403)
  //         .json({ message: "You're not a owner this portfolio" })
  //         .end();

  //     const result = await this.repo.delete(req.params._id);
  //     return res.status(200).json(result).end();
  //   } catch (error) {
  //     if (error instanceof URIError)
  //       return res.status(400).json({ message: `${error}` });

  //     res
  //       .status(404)
  //       .json({ message: "Can't delete because portfolio not found" }).end;
  //   }
  // };
}
