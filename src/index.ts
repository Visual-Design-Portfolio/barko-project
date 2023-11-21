import "dotenv/config";
import cors from "cors";
import JWTMiddleware from "./middleware/jwt";
import express, { Request, Response } from "express";
import mongoose, { ObjectId } from "mongoose";
import UserRepository from "./repositories/user";
import { IUserHandler } from "./handlers";
import UserHandler from "./handlers/user";
import User from "./schemas/user_info";
import { DATABASE_URL } from "./const";

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
const jwtMiddleware = new JWTMiddleware();

const userHandler: IUserHandler = new UserHandler(userRepo);

app.use(express.json());
app.use(cors());

app.get("/", jwtMiddleware.auth, (req, res) => {
  return res.status(200).send("Welcome to LearnHub").end();
});

const userRouter = express.Router();
app.use("/user", userRouter);
userRouter.post("/", userHandler.registration);
userRouter.get("/:username", userHandler.findByEmail);

const authRouter = express.Router();
app.use("/auth", authRouter);
authRouter.get("/me", jwtMiddleware.auth, userHandler.findById);
authRouter.post("/login", userHandler.login);

app.listen(port, () => {
  console.log(`Test API is up at ${port}`);
});
