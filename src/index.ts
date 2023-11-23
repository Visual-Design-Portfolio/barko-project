import "dotenv/config";
import cors from "cors";
import JWTMiddleware from "./middleware/jwt";
import express from "express";
import mongoose from "mongoose";
import { IPortfolioHandler, IUserHandler } from "./handlers";
import UserHandler from "./handlers/user";
import User from "./schemas/user_info";
import { DATABASE_URL } from "./const";
import PortfolioRepository from "./repositories/portfolio";
import Portfolio from "./schemas/portfolio_info";
import UserRepository from "./repositories/user";
import PortfolioHandler from "./handlers/portfolio";

const port = Number(process.env.PORT || 8888);
const app = express();
app.use(cors());

if (!DATABASE_URL) throw new Error("Database not found");
const db = mongoose.connection;
mongoose.connect(DATABASE_URL);
db.on("error", console.error.bind(console, "Connection error from mongo"));
db.once("open", () => {
  console.log("connect to MongoDB successfully");
});

const userRepo = new UserRepository(User);
const portfolioRepo = new PortfolioRepository(Portfolio);
const jwtMiddleware = new JWTMiddleware();

const userHandler: IUserHandler = new UserHandler(userRepo);
const portfolioHandler: IPortfolioHandler = new PortfolioHandler(portfolioRepo);

app.use(express.json());
app.use(cors());

app.get("/", jwtMiddleware.auth, (req, res) => {
  console.log(res.locals);
  return res.status(200).send("Welcome to LearnHub").end();
});

const userRouter = express.Router();
app.use("/user", userRouter);
userRouter.post("/", userHandler.registration);
userRouter.get("/:email", userHandler.findByEmail);

const portfolioRouter = express.Router();
app.use("/portfolio", portfolioRouter);
portfolioRouter.post("/", jwtMiddleware.auth, portfolioHandler.create);
portfolioRouter.get("/", portfolioHandler.getAll);

const authRouter = express.Router();
app.use("/auth", authRouter);
authRouter.get("/me", jwtMiddleware.auth, userHandler.findById);
authRouter.post("/login", userHandler.login);

app.listen(port, () => {
  console.log(`Test API is up at ${port}`);
});
