import { NextFunction, Request, Response } from "express";
import Hobby, { IHobby } from "../../models/hobby";
import { IUser } from "../../models/user";

export async function createHobby(req: Request, res: Response, next: NextFunction): Promise<void> {
  const hobby: IHobby = new Hobby({ user: req.params.userId, ...req.body });

  try {
    await hobby.save();

    res.status(201)
      .json(hobby.toObject({ virtuals: true }));
  } catch (err) {
    // TODO: Improve handling of model errors
    next(err);
  }
}

export async function getHobby(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const hobby = await Hobby.findById(req.params.hobbyId).populate("user");

    if (!hobby || (hobby.user as IUser).id !== req.params.userId) {
      res.status(404);
      res.json({ message: "Requested hobby does not exists" });
    } else {
      res.json(hobby.toObject({ virtuals: true }));
    }
  } catch (err) {
    // TODO: Improve handling of model errors
    next(err);
  }
}

export async function getHobbies(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const hobbies = await Hobby.find({}).populate("user");

    res.json(hobbies.map((hobby) => hobby.toObject({ virtuals: true })));
  } catch (err) {
    // TODO: Improve handling of model errors
    next(err);
  }
}

export async function deleteHobby(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const hobby = await Hobby.findById(req.params.hobbyId).populate("user");

    if (!hobby || (hobby.user as IUser).id !== req.params.userId) {
      res.status(404);
      res.json({ message: "Requested hobby does not exists" });
    } else {
      await hobby.remove();

      res.status(204).end();
    }
  } catch (err) {
    // TODO: Improve handling of model errors
    next(err);
  }
}
