import config = require("config");
import express, { Application } from "express";
import mongoose from "mongoose";
import createMiddleware, { SwaggerMiddleware } from "swagger-express-middleware";
import swaggerUi from "swagger-ui-express";
import * as swaggerSpecJson from "./api/swagger.json";
import routes from "./controllers/routes";
import errorHandler from "./middlewares/error-handler";
import notFoundHandler from "./middlewares/not-found-handler";

// enable promisified operations
mongoose.Promise = Promise;

const app: Application = express();
const uiBasePath: string = config.get("api.uiBasePath");
const apiBasePath: string = config.get("api.basePath");

createMiddleware(swaggerSpecJson, app, (err, middleware: SwaggerMiddleware) => {
  app.disable("x-powered-by");

  app.use(express.json());
  app.use(middleware.metadata());
  app.use(middleware.parseRequest());
  app.use(middleware.validateRequest());

  app.use(uiBasePath, swaggerUi.serve, swaggerUi.setup(swaggerSpecJson));

  // registers api routes and redirection from / to {uiBasePath}
  routes.register(app, apiBasePath, uiBasePath);

  app.use(notFoundHandler);
  app.use(errorHandler);
});

export default app;
