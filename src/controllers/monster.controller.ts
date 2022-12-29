import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Id } from 'objection';
import { Monster } from '../models';

const list = async (req: Request, res: Response): Promise<Response> => {
  const monsters = await Monster.query();
  return res.status(StatusCodes.OK).json(monsters);
};

export const get = async (req: Request, res: Response): Promise<Response> => {
  const id: Id = req.params.id;
  try {
    const monster = await Monster.query().findById(id).throwIfNotFound({
      message: 'Not Found',
      type: 'not_found',
    });
    return res.status(StatusCodes.OK).json(monster);
  } catch (e) {
    return res.sendStatus(StatusCodes.NOT_FOUND);
  }
};

export const create = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const monster = await Monster.query().insert(req.body);
  return res.status(StatusCodes.CREATED).json(monster);
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: Id = req.params.id;
  try {
    await Monster.query().findById(id).patch(req.body).throwIfNotFound({
      message: 'Not Found',
      type: 'not_found',
    });
    return res.sendStatus(StatusCodes.OK);
  } catch (e) {
    return res.sendStatus(StatusCodes.NOT_FOUND);
  }
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: Id = req.params.id;
  try {
    await Monster.query().deleteById(id).throwIfNotFound({
      message: 'Not Found',
      type: 'not_found',
    });
    return res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (e) {
    return res.sendStatus(StatusCodes.NOT_FOUND);
  }
};

export const MonsterController = {
  get,
  create,
  update,
  remove,
  list,
};
