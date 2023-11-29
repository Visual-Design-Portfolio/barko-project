import { string } from "yup";
import { IPortfolioRepository } from ".";
import { IPortfolioModel } from "../schemas/portfolio_info";
import { IPortfolioDTO } from "../dto/portfolio";
import mongoose, { Error } from "mongoose";

export default class PortfolioRepository implements IPortfolioRepository {
  constructor(private Portfolio: IPortfolioModel) {
    this.Portfolio = Portfolio;
  }

  public getPortfolioAll: IPortfolioRepository["getPortfolioAll"] =
    async () => {
      const results = await this.Portfolio.find();
      return results;
    };

  public getPortfolioById: IPortfolioRepository["getPortfolioById"] = async (
    _id
  ) => {
    const result = await this.Portfolio.findById(_id);
    if (!result) {
      throw new Error("Portfolio not found");
    }

    return result;
  };

  public create: IPortfolioRepository["create"] = async (_id, portfolio) => {
    return await this.Portfolio.create({
      name: portfolio.name,
      ownerName: portfolio.ownerName,
      picture: portfolio.picture,
      education: portfolio.education,
      workExperience: portfolio.workExperience,
      project: portfolio.project,
      skill: portfolio.skill,
      userId: _id,
      // userEmail: newPortfolio.userEmail,
    });
  };

  public update: IPortfolioRepository["update"] = async (_id, portfolio) => {
    try {
      if (!_id || !portfolio) {
        throw new Error("Please add portfolio ID");
      }

      const updatedPortfolio = await this.Portfolio.findOneAndUpdate(
        { _id },
        { $set: portfolio },
        { new: true }
      );
      if (!updatedPortfolio) {
        throw new Error("Not found portfolio for update ");
      }

      return updatedPortfolio;
    } catch (error) {
      throw new Error(`Can't update portfolio`);
    }
  };

  public delete: IPortfolioRepository["delete"] = async (_id) => {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new Error("Invalid portfolio ID");
    }

    try {
      const deletedPortfolio: IPortfolioDTO | null =
        await this.Portfolio.findByIdAndDelete(_id);
      if (!deletedPortfolio) {
        throw new Error("Can't delete because portfolio not found");
      }
      return deletedPortfolio;
    } catch (error) {
      throw new Error(`Can't delete portfolio: ${error}`);
    }
  };
}
