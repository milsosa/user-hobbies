import config from "config";
import app from "./app";
import database from "./services/database";
import logger from "./services/logger";

function startServer() {
  const port = config.get("server.port");

  app.listen(port, () => {
    logger.debug("Application listening on: http://localhost:%d", port);
  });
}

database.connect()
  .then(() => {
    logger.info("Database connection successfully");

    return startServer();
  })
  .catch((err) => {
    logger.error("Unable to connect to database, caused by: %s", err.message || err);
    process.exit(1);
  });
