import { NextFunction, Request, Response } from "express";
import logger from "../services/logger";

function errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
  logger.error("Error handling the request: %s - %s, caused by: %s", req.method, req.originalUrl, err.message || err);

  // means a request validation error
  if (err.status) {
    res.status(err.status)
      .json({
        message: err.message,
      });
    return;
  }

  if (!res.headersSent) {
    res.status(500)
      .json({
        message: "An error occurred, please try again later",
      });
  } else {
    logger.warn("Requests %s : %s already answered", req.method, req.originalUrl);
  }
}

export default errorHandler;
