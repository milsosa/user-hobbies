import { Document, model, Schema } from "mongoose";
import { CustomSchemaOptions } from "./options";
import { IUser } from "./user";

enum PassionLevel {
    LOW = "Low",
    MEDIUM = "Medium",
    HIGH = "High",
    VERY_HIGH = "Very-High",
}

export interface IHobby extends Document {
    id: string;
    name: string;
    year: string;
    passionLevel: PassionLevel;
    user: string | IUser;
}

const hobbySchema = new Schema({
    name: {
      max: 50,
      required: true,
      type: String,
    },
    passionLevel: {
      required: true,
      type: PassionLevel,
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    year: {
      max: 4,
      required: true,
      type: String,
    },
}, CustomSchemaOptions);

hobbySchema.statics.toJSON = function toJson(hobby: IHobby) {
  const { _id: id, ...rest} = hobby;

  return {
    id,
    ...rest,
  };
};

export default model<IHobby>("Hobby", hobbySchema);
