import { NextFunction, Request, Response } from "express";
import logger from "../services/logger";

function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  logger.warn("The requested endpoint: %s is invalid, responding with 404.", req.originalUrl);

  res.status(404)
    .json({
      message: "Requested endpoint not found",
    });
}

export default notFoundHandler;
