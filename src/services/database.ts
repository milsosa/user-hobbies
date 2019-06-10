import config = require("config");
import mongoose from "mongoose";
import logger from "./logger";

const port = config.get("database.port");
const name = config.get("database.name");
const host = config.get("database.host");
const debugEnabled = config.get("database.debug");

const DATABASE_URI = `mongodb://${host}:${port}/${name}`;

let connected: boolean = false;

async function connect() {
  if (!connected) {
    try {
      await mongoose.connect(DATABASE_URI, { useNewUrlParser: true, useFindAndModify: false });
    } catch (err) {
      logger.error("An error occurred connecting to the database: %s", err.message || err);

      throw err;
    }

    if (debugEnabled) {
      enableDebug();
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

function enableDebug() {
  mongoose.set("debug", (coll: any, method: any, query: any, doc: any, options: any) => {
    const operationData = { coll, doc, method, options, query };

    logger.debug("DB Operation: ", operationData);
  });
}

function getConnectionURI(): string {
  return DATABASE_URI;
}

export default { connect, disconnect, getConnectionURI };
