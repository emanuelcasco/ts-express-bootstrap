import { Request, Response, NextFunction } from 'express';

import * as userService from '../../services/users';
import { HEADER_NAME, decode } from '../../services/session-manager';
import { authenticationError } from '../errors';
import { User } from '../../db/entities/User';

export async function authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
  const token = req.headers[HEADER_NAME] as string | undefined;

  if (token) {
    try {
      const payload: User = decode(token);
      const user = await userService.findBy({ id: payload.id });
      if (user) {
        req.user = user;
        return next();
      }
    } catch (error) {
      return next(authenticationError('Token provided is invalid!'));
    }
  }
  return next(authenticationError('Token authorization is required!'));
}
