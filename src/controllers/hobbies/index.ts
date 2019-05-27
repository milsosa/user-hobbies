import { NextFunction, Request, Response } from "express";
import Hobby, { IHobby } from "../../models/hobby";

export async function createHobby(req: Request, res: Response, next: NextFunction): Promise<void> {
  const hobby: IHobby = new Hobby({ user: req.params.userId, ...req.body });

  try {
    await hobby.save();

    res.status(201)
      .json(hobby.toObject());
  } catch (err) {
    next(err);
  }
}

export async function getHobby(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const hobby = await Hobby.findOne({ _id: req.params.hobbyId, user: req.params.userId });

    if (!hobby) {
      res.status(404)
        .json({ message: "Requested hobby does not exists" });
    } else {
      res.json(hobby.toObject());
    }
  } catch (err) {
    next(err);
  }
}

export async function getHobbies(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const hobbies = await Hobby.find({});

    res.json(hobbies.map((hobby) => hobby.toObject()));
  } catch (err) {
    // TODO: Improve handling of model errors
    next(err);
  }
}

export async function deleteHobby(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const hobby = await Hobby.findOne({ _id: req.params.hobbyId, user: req.params.userId });

    if (!hobby) {
      res.status(404);
      res.json({ message: "Requested hobby does not exists" });
    } else {
      await hobby.remove();

      res.status(204).end();
    }
  } catch (err) {
    next(err);
  }
}
