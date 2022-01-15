import { Router, Request, Response } from "express";
import { stageUser } from "../api/staged-user/stage";

export const stagedUserRouter = Router();


stagedUserRouter.post('/', async (request: Request, response: Response) => {
  const stagedUser = await stageUser(request.body.email, request.body.password)
  response.status(201).send(stagedUser.asModel());
});

