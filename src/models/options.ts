import { SchemaOptions } from "mongoose";
import logger from "../services/logger";

export function createOptionsFor(schemaName: string): SchemaOptions {
  return {
    toObject: {
      transform(doc, retObj, opts) {
        logger.debug("Transforming to object, model: %s - ", schemaName, retObj);
        retObj.id = retObj._id;

        delete retObj._id;
      },
    },
    versionKey: false,
  };
}
