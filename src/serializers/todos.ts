/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { Todo } from '../services/todos';

export const serializeTodoDetail = (todo: Todo) => ({
  id: todo.id,
  user_id: todo.userId,
  title: todo.title,
  completed: todo.completed
});

export const serializeTodoList = (todos: Todo[]) => todos.map(serializeTodoDetail);
