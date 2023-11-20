import express from "express";
import { PrismaClient } from "@prisma/client";
import UserRepository from "./repositories/user";
import { IUserHandler } from "./handlers";
import UserHandler from "./handlers/user";
import JWTMiddleware from "./middleware/jwt";

const port = 8080;

const app = express();
const clnt = new PrismaClient();

const userRepo = new UserRepository(clnt);
const jwtMiddleware = new JWTMiddleware();

const userHandler: IUserHandler = new UserHandler(userRepo);

app.use(express.json());

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
