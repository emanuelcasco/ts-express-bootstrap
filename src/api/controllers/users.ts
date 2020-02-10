import { Request, Response, NextFunction } from 'express';

import { alreadyExistError, notFoundError, authenticationError } from '../errors';
import * as status from '../../utils/status-codes';
import * as userService from '../../services/users';
import * as bcryptService from '../../services/bcrypt';
import * as sessionManager from '../../services/session-manager';
import { serializeUserDetail, serializeUserList } from '../../serializers/users';

export async function findAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const { users, count } = await userService.findAll();
    return res.send({ users: serializeUserList(users), count });
  } catch (error) {
    return next(error);
  }
}

export async function findById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const id: number | string = req.params.id;
    const user = await userService.findById(Number(id));
    if (!user) throw notFoundError(`User with id #${id} not found!`);
    return res.send(serializeUserDetail(user));
  } catch (error) {
    return next(error);
  }
}

export async function signup(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const params: userService.UserParams = req.body;
    const exist = await userService.findBy({ email: params.email });
    if (exist) throw alreadyExistError(`User with email ${params.email} already exist!`);

    const cryptedPassword = await bcryptService.encrypt(params.password);
    const user = await userService.create({ ...params, password: cryptedPassword });
    return res.status(status.CREATED).send(serializeUserDetail(user));
  } catch (err) {
    return next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const { email, password }: { email: string; password: string } = req.body;
    const user = await userService.findBy({ email });
    if (user) {
      const isValid = await bcryptService.compare(password, user.password);
      if (isValid) {
        const payload = sessionManager.encode(user);
        res.set(sessionManager.HEADER_NAME, payload);
        return res.send({ message: `User "${email}" authenticated succesfully!` });
      }
      throw authenticationError('Email or password incorrect');
    }
    throw authenticationError('Provided user does not exist');
  } catch (err) {
    return next(err);
  }
}
