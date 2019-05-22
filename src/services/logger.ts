import config from "config";
import { createLogger, format, Logger, transports } from "winston";

const logger: Logger = createLogger({
  format: format.combine(
    format.splat(),
    format.simple(),
  ),
  level: config.get("logging.level"),
  transports: [
    new transports.Console(),
  ],
});

export default logger;
