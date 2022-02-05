import { NextFunction, Request, Response } from 'express';
import { BadRequestError, NotFoundError, UserModel, Utils } from 'recipiece-common';

export async function getUser(req: Request, res: Response, next: NextFunction) {
  let fcn = undefined;
  let query = undefined;
  if (req.body.username) {
    fcn = getUserByUsername;
    query = req.body.username;
  } else if (req.body.email) {
    fcn = getUserByEmail;
    query = req.body.email;
  } else if (req.body._id) {
    fcn = getUserById;
    query = req.body._id;
  }
  if (fcn) {
    const user = await fcn(query);
    if (!Utils.nou(user)) {
      res.status(200).send(user.asJson());
    } else {
      next(new NotFoundError(query));
    }
  } else {
    next(new BadRequestError('criteria', 'undefined'));
  }
}

export async function getUserByUsername(username: string) {
  return await UserModel.findOne({
    username: username,
  });
}

export async function getUserById(id: string) {
  return await UserModel.findById(id);
}

export async function getUserByEmail(email: string) {
  return await UserModel.findOne({
    email: email,
  });
}
