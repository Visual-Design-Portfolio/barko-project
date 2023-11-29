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
import mongoose, { Error } from "mongoose";
import { object } from "yup";
import User from "../schemas/user_info";

export default class PortfolioHandler implements IPortfolioHandler {
  private repo: IPortfolioRepository;
  constructor(repo: IPortfolioRepository) {
    this.repo = repo;
  }

  public getPortfolioAll: RequestHandler<{}, IPortfolioDTO[] | IErrorDTO> =
    async (req, res) => {
      try {
      } catch (error) {
        console.error(error);
        if (error instanceof URIError)
          return res.status(400).json({ message: `${error}` });

        res.status(500).json({ message: "Internal server error" }).end;
      }
    };

  public getPortfolioById: RequestHandler<ID, IPortfolioDTO | IErrorDTO> =
    async (req, res) => {
      try {
        const result = await this.repo.getPortfolioById(req.params._id);
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
      // userEmail,
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
      // userEmail,
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
        userId: result.userId,
        // userEmail: result.userEmail,
      };

      return res.status(201).json(returnResult).end();
    } catch (error) {
      console.error(error);
      if (error instanceof URIError)
        return res.status(400).json({ message: `${error}` });

      return res.status(400).json({ message: "Can't create portfolio" }).end();
    }
  };

  public update: RequestHandler<
    ID,
    IPortfolioDTO | IErrorDTO,
    IUpdatePortfolioDTO,
    undefined,
    AuthStatus
  > = async (req, res) => {
    try {
      const p = await this.repo.getPortfolioById(req.params._id);
      if (
        !p ||
        (p.userId && p.userId.toString("hex") !== res.locals.user.userId)
      ) {
        return res
          .status(403)
          .json({ message: "You're not the owner of this Portfolio" })
          .end();
      }

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

      const updatePortfolioData = {
        name,
        ownerName,
        picture,
        education,
        workExperience,
        project,
        skill,
      };

      const objectId = String(req.params._id);
      const updateData = await this.repo.update(objectId, updatePortfolioData);
      if (updateData) {
        const returnResult: IPortfolioDTO = {
          _id: updateData._id,
          name: updateData.name,
          ownerName: updateData.ownerName,
          picture: updateData.picture,
          createdAt: updateData.createdAt,
          updatedAt: updateData.updatedAt,
          education: updateData.education,
          workExperience: updateData.workExperience,
          project: updateData.project,
          skill: updateData.skill,
          userId: updateData.userId,
          // userEmail: updateData.userEmail,
        };

        return res.status(200).json(returnResult).end();
      }
    } catch (error) {
      if (error instanceof URIError)
        return res
          .status(400)
          .json({ message: `${error}` })
          .end();
    }
  };

  public delete: RequestHandler<
    ID,
    IPortfolioDTO | string | IErrorDTO,
    undefined,
    undefined,
    AuthStatus
  > = async (req, res) => {
    try {
      const p = await this.repo.getPortfolioById(req.params._id);

      if (
        !p ||
        !p.userId ||
        p?.userId.toString("hex") !== res.locals.user.userId
      ) {
        return res
          .status(403)
          .json({ message: "You're not the owner of this Portfolio" })
          .end();
      }

      const result = await this.repo.delete(String(req.params._id));
      if (
        !result ||
        !result.userId ||
        result?.userId.toString("hex") !== res.locals.user.userId
      ) {
        return res
          .status(404)
          .json({ message: "Can't delete because portfolio not found" })
          .end();
      }
      return res.status(200).json(result).end();
    } catch (error) {
      console.error(error);
    }

    return res.status(500).json({ message: "Internal server error" }).end;
  };
}
