import { IPortfolioRepository } from ".";
import { ICreatePortfolioDTO } from "../dto/portfolio";
import { IPortfolio, IPortfolioModel } from "../schemas/portfolio_info";

export default class PortfolioRepository implements IPortfolioRepository {
  constructor(private Portfolio: IPortfolioModel) {
    this.Portfolio = Portfolio;
  }

  public create: IPortfolioRepository["create"] = async (id, portfolio) => {
    console.log(portfolio);

    return (await this.Portfolio.create({
      name: portfolio.name,
      ownerName: portfolio.ownerName,
      picture: portfolio.picture,
      education: portfolio.education,
      workExperience: portfolio.workExperience,
      project: portfolio.project,
      skill: portfolio.skill,
      template: portfolio.template,
      userInfo: id,
    })) as IPortfolio;
  };
}
