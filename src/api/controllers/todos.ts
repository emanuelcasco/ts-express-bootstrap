import { Request, Response, NextFunction } from 'express';

import * as todosService from '../../services/todos';
import { serializeTodoDetail, serializeTodoList } from '../../serializers/todos';

export async function findAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const todos = await todosService.findAll();
    return res.send(serializeTodoList(todos));
  } catch (error) {
    return next(error);
  }
}

export async function findById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const { id } = req.params;
    const todo = await todosService.findById(id);
    return res.send(serializeTodoDetail(todo));
  } catch (error) {
    return next(error);
  }
}
