// import mongoose, { model } from "mongoose";

// export interface ITemplate {
//   name: string;
//   url: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const templateSchema = new mongoose.Schema<ITemplate>({
//   name: {
//     type: String,
//     required: true,
//   },
//   url: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Template = mongoose.model("Template", templateSchema);

// export default Template;
// export type ITemplateModel = typeof Template;
