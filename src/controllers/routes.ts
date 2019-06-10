import { Application, NextFunction, Request, RequestHandler, Response, Router } from "express";
import logger from "../services/logger";
import * as hobbies from "./hobbies";
import * as users from "./users";

function redirectToSwaggerUi(uiBasePath: string): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    logger.info("Redirecting request from / to %s", uiBasePath);
    res.redirect(uiBasePath);
  };
}

function register(app: Application, basePath: string, uiBasePath: string): void {
  const userRouter: Router = Router();
  const hobbiesRouter: Router = Router({ mergeParams: true });

  userRouter
    .post("/users", users.createUser)
    .get("/users", users.getUsers)
    .get("/users/:userId", users.getUser)
    .delete("/users", users.deleteUsers)
    .delete("/users/:userId", users.deleteUser);

  hobbiesRouter
    .post("/hobbies", hobbies.createHobby)
    .get("/hobbies", hobbies.getHobbies)
    .get("/hobbies/:hobbyId", hobbies.getHobby)
    .delete("/hobbies/:hobbyId", hobbies.deleteHobby);

  userRouter.use("/users/:userId", hobbiesRouter);

  app.use(basePath, userRouter);
  app.get("/", redirectToSwaggerUi(uiBasePath));
}

export default { register };
