import { string } from "yup";
import { IPortfolioRepository } from ".";
import { IPortfolioModel } from "../schemas/portfolio_info";

export default class PortfolioRepository implements IPortfolioRepository {
  constructor(private Portfolio: IPortfolioModel) {
    this.Portfolio = Portfolio;
  }

  public getAll: IPortfolioRepository["getAll"] = async () => {
    const results = await this.Portfolio.find();
    return results;
  };

  public getById: IPortfolioRepository["getById"] = async (_id) => {
    const result = await this.Portfolio.findById(_id);

    return result;
  };

  public create: IPortfolioRepository["create"] = async (id, portfolio) => {
    return await this.Portfolio.create({
      name: portfolio.name,
      ownerName: portfolio.ownerName,
      picture: portfolio.picture,
      education: portfolio.education,
      workExperience: portfolio.workExperience,
      project: portfolio.project,
      skill: portfolio.skill,
      userInfo: id,
    });
  };

  // public update: IPortfolioRepository["update"] = async (_id, portfolio) => {
  //   return await this.Portfolio.findByIdAndUpdate(_id, {
  //     $set: {
  //       name: portfolio.name,
  //       ownerName: portfolio.ownerName,
  //       picture: portfolio.picture,
  //       education: portfolio.education,
  //       workExperience: portfolio.workExperience,
  //       project: portfolio.project,
  //       skill: portfolio.skill,
  //       userInfo: _id,
  //     },
  //   });
  // };

  // public delete: IPortfolioRepository["delete"] = async (_id) => {
  //   return await this.Portfolio.findOneAndDelete({ _id });
  // };
}
