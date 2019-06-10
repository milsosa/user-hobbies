import { Document, model, Schema } from "mongoose";
import logger from "../services/logger";
import { createOptionsFor } from "./options";
import User, { IUser } from "./user";

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
  user: IUser;
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
}, createOptionsFor("Hobby"));

hobbySchema.post("save", async (hobby: IHobby) => {
  logger.debug("Adding hobby id '%s' to user: %s", hobby.id, hobby.user);

  await User.findOneAndUpdate({ _id: hobby.user }, { $push: { hobbies: hobby.id } });

  await hobby.populate("user", "-hobbies")
    .execPopulate();
});

hobbySchema.pre("find", function() {
  this.populate("user", "-hobbies");
});

hobbySchema.pre("findOne", function() {
  logger.debug("Enabling population of user for hobby find query");
  this.populate("user", "-hobbies");
});

hobbySchema.post("remove", async (hobby: IHobby) => {
  const hobbyWithUser = await hobby.populate("user", "id hobbies")
    .execPopulate();

  const { user } = hobbyWithUser;

  const filteredHobbies = user.hobbies
    .filter((hobbyItem: IHobby) => hobbyItem.id !== hobby.id)
    .map((hobbyItem: IHobby) => hobbyItem.id);

  await User.findOneAndUpdate({ _id: user.id }, { hobbies: filteredHobbies });

  logger.debug("Removed hobby %s from user %s", hobby.id, user.id);
});

export default model<IHobby>("Hobby", hobbySchema);
