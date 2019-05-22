import config = require("config");
import mongoose from "mongoose";
import logger from "./logger";

const port = config.get("database.port");
const name = config.get("database.name");
const host = config.get("database.host");

const DATABASE_URI = `mongodb://${host}:${port}/${name}`;

let connected: boolean = false;

async function connect() {
  if (!connected) {
    try {
      await mongoose.connect(DATABASE_URI, { useNewUrlParser: true });
    } catch (err) {
      logger.error("An error occurred connecting to the database: %s", err.message || err);

      throw err;
    }

    connected = true;
  }
}

async function disconnect() {
  if (connected) {
    try {
      await mongoose.disconnect();
    } catch (err) {
      logger.error("An error occurred disconnecting from the database: %s", err.message || err);

      throw err;
    }
  }
}

function getConnectionURI(): string {
  return DATABASE_URI;
}

export default { connect, disconnect, getConnectionURI };
