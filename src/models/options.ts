import { SchemaOptions } from "mongoose";

export const CustomSchemaOptions: SchemaOptions = {
  toObject: {
    transform(doc, retObj, opts) {
      retObj.id = retObj._id;

      delete retObj._id;
    },
  },
  versionKey: false,
};
