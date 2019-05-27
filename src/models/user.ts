import { Document, model, Schema } from "mongoose";
import logger from "../services/logger";
import Hobby, { IHobby } from "./hobby";
import { createOptionsFor } from "./options";

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
}, createOptionsFor("User"));

userSchema.pre("find", function() {
  logger.debug("Enabling population of hobbies for users find query");
  this.populate("hobbies", "-user");
});

userSchema.pre("findOne", function() {
  logger.debug("Enabling population of hobbies for user find query");
  this.populate("hobbies", "-user");
});

userSchema.post("remove", async (user: IUser) => {
  logger.debug("Removing hobbies for user: %s", user.id);
  await Hobby.deleteMany({ user: user.id });
});

export default model<IUser>("User", userSchema);
