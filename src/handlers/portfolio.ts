import { RequestHandler } from "express";
import { IPortfolioHandler } from ".";
import { IErrorDTO } from "../dto/error";
import { IPortfolioDTO, ICreatePortfolioDTO } from "../dto/portfolio";
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

    // console.log(`${createPortfolioData}`);
    console.log(res.locals.user.userId);
    console.log({ local: res.locals.user.userId });

    try {
      const result = await this.repo.create(
        res.locals.user.userId,
        createPortfolioData
      );

      //   console.log(result);

      const returnReslut: IPortfolioDTO = {
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

      return res.status(201).json(returnReslut).end();
    } catch (error) {
      console.error(error);
      if (error instanceof URIError)
        return res.status(400).json({ message: `${error}` });

      return res.status(400).json({ message: "Can't create portfolio" }).end();
    }
  };
}
