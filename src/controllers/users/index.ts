import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../../models/user";

export async function createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  const user: IUser = new User(req.body);

  try {
    await user.save();

    res.status(201)
      .json({ id: user.id, name: user.name });
  } catch (err) {
    next(err);
  }
}

export async function getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = await User.findOne({ _id: req.params.userId });

    if (!user) {
      res.status(404)
        .json({ message: "Requested user does not exists" });
    } else {
      res.json(user.toObject());
    }
  } catch (err) {
    next(err);
  }
}

export async function getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const users = await User.find({});

    res.json(users.map((user) => user.toObject()));
  } catch (err) {
    next(err);
  }
}

export async function deleteUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { deletedCount } = await User.find({}).remove();

    res.status(200)
      .json({ deletedCount, message: "Users deleted successfully" });
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = await User.findOne({ _id: req.params.userId });

    if (!user) {
      res.status(404)
        .json({ message: "Requested user does not exists" });
    } else {
      await user.remove();

      res.status(204).end();
    }
  } catch (err) {
    next(err);
  }
}
