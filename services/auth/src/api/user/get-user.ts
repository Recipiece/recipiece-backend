import { NextFunction, Request, Response } from "express";
import { BadRequestError, DatabaseConstants, DbI, NotFoundError, User, Utils } from "recipiece-common";
import { nou } from "recipiece-common/dist/utils";

export async function getUser(req: Request, res: Response, next: NextFunction) {
  let fcn = undefined;
  let query = undefined;
  if(req.body.username) {
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
    if(!nou(user)) {
      res.status(200).send(user.asJson());
    } else {
      next(new NotFoundError(query));
    }
  } else {
    next(new BadRequestError('criteria', 'undefined'));
  }
}

export async function getUserByUsername(username: string): Promise<User | undefined> {
  const dbEntity = await DbI.queryEntity(DatabaseConstants.collections.users, {
    username: username,
  });
  if (dbEntity.data.length > 0) {
    return new User(dbEntity.data[0]);
  } else {
    return undefined;
  }
}

export async function getUserById(id: string): Promise<User | undefined> {
  const userI = await DbI.getEntityById(DatabaseConstants.collections.users, id);
  if (!Utils.nou(userI)) {
    return new User(userI);
  } else {
    return undefined;
  }
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const dbEntity = await DbI.queryEntity(DatabaseConstants.collections.users, {
    email: email,
  });
  if (dbEntity.data.length > 0) {
    return new User(dbEntity.data[0]);
  } else {
    return undefined;
  }
}
