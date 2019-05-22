import { Document, model, Schema } from "mongoose";
import { IHobby } from "./hobby";
import { CustomSchemaOptions } from "./options";

export interface IUser extends Document {
  id: string;
  name: string;
  hobbies: IHobby[];
}

const userSchema: Schema = new Schema({
  hobbies: [{ type: Schema.Types.ObjectId, ref: "Hobby" }],
  name: {
    max: 26,
    required: true,
    type: String,
  },
}, CustomSchemaOptions);

userSchema.statics.toJSON = function toJson(user: IUser) {
  const { _id: id, ...rest} = user;

  return {
    id,
    ...rest,
  };
};

export default model<IUser>("User", userSchema);
