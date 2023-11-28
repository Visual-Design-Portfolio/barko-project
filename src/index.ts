import "dotenv/config";
import cors from "cors";
import JWTMiddleware from "./middleware/jwt";
import express from "express";
import mongoose, { connect } from "mongoose";
import { IPortfolioHandler, IUserHandler } from "./handlers";
import ConnectDB from "./utils/connectdb";
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

const userRepo = new UserRepository(User);
const portfolioRepo = new PortfolioRepository(Portfolio);
const jwtMiddleware = new JWTMiddleware();

const userHandler: IUserHandler = new UserHandler(userRepo);
const portfolioHandler: IPortfolioHandler = new PortfolioHandler(portfolioRepo);

app.use(express.json());
app.use(cors());

app.get("/", jwtMiddleware.auth, (req, res) => {
  return res.status(200).send("Welcome to Visual design portfolio").end();
});

// for test github action
const userRouter = express.Router();
app.use("/user", userRouter);
userRouter.post("/", userHandler.registration);
userRouter.get("/:email", userHandler.findByEmail);
userRouter.get("/find/:_id", userHandler.findById);

const portfolioRouter = express.Router();
app.use("/portfolio", portfolioRouter);
portfolioRouter.get("/", portfolioHandler.getPortfolioAll);
portfolioRouter.get("/:_id", portfolioHandler.getPortfolioById);
portfolioRouter.post("/", jwtMiddleware.auth, portfolioHandler.create);
portfolioRouter.patch("/:_id", jwtMiddleware.auth, portfolioHandler.update);
portfolioRouter.delete("/:_id", jwtMiddleware.auth, portfolioHandler.delete);

const authRouter = express.Router();
app.use("/auth", authRouter);
authRouter.post("/login", userHandler.login);

ConnectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Test API is up at ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);

    console.log("Error connecting to MongoDB");

    process.exit(1);
  });
