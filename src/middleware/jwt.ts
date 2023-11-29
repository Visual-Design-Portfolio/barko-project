import { RequestHandler } from "express";
import { JsonWebTokenError, JwtPayload, verify } from "jsonwebtoken";
import { JWT_SECRET } from "../const";

export interface AuthStatus {
  user: { userId: string };
}

export default class JWTMiddleware {
  constructor() {}

  auth: RequestHandler<unknown, unknown, unknown, unknown, AuthStatus> = (
    req,
    res,
    next
  ) => {
    try {
      const token = req.header("Authorization")!.replace("Bearer ", "").trim();
      if (!token) {
        return res.status(401).json({});
      }

      console.log(token);

      const { userId } = verify(token, JWT_SECRET) as JwtPayload;

      console.log(`Found user id in JWT token: ${userId}`);

      res.locals = {
        user: {
          userId,
        },
      };

      return next();
    } catch (error) {
      console.error(error);
      if (error instanceof TypeError)
        return res.status(401).json("Authroziation header is expected").end();
      if (error instanceof JsonWebTokenError)
        return res.status(403).json("Token in invalid").end();
      return res.status(500).json("Internal Server Error").end();
    }
  };
}
