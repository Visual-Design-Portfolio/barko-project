import { IPortfolioRepository } from ".";
import { IPortfolioDTO } from "../dto/portfolio";
import { IPortfolio, IPortfolioModel } from "../schemas/portfolio_info";

export default class PortfolioRepository implements IPortfolioRepository {
  constructor(private Portfolio: IPortfolioModel) {
    this.Portfolio = Portfolio;
  }

  public getAll: IPortfolioRepository["getAll"] = async () => {
    const results = await this.Portfolio.find();
    return results;
  };

  // public getAll: IPortfolioRepository["getAll"] = async () => {
  //   return (await this.Portfolio.find(
  //     {},
  //     {
  //       _id,
  //       ownerName,
  //       name,
  //       picture,
  //       education,
  //       workExperience,
  //       project,
  //       skill,
  //       template,
  //       userInfo,
  //       createdAt,
  //       updatedAt,
  //     }
  //   )) as IPortfolio;
  // };

  public create: IPortfolioRepository["create"] = async (id, portfolio) => {
    console.log(portfolio);

    return await this.Portfolio.create({
      name: portfolio.name,
      ownerName: portfolio.ownerName,
      picture: portfolio.picture,
      education: portfolio.education,
      workExperience: portfolio.workExperience,
      project: portfolio.project,
      skill: portfolio.skill,
      // template: portfolio.template,
      userInfo: id,
    });
  };
}
