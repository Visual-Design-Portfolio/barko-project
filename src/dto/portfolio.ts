import {
  IEducation,
  IPortfolio,
  IProject,
  ISkill,
  ITemplate,
  IWorkExperience,
} from "../schemas/portfolio_info";

export interface IPortfolioDTO extends IPortfolio {}

export interface ICreatePortfolioDTO {
  name: string;
  ownerName: string;
  picture: string;
  education: IEducation;
  workExperience: IWorkExperience;
  project: IProject;
  skill: ISkill;
  template: ITemplate;
}

export interface IUpdateContentDTO extends IPortfolio {}
