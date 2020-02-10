import got from 'got';

import { externalApiError } from '../api/errors';
import config from '../config';

const instance = got.extend({
  prefixUrl: config.todosExternalApi.baseUrl,
  responseType: 'json'
});

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export async function findAll(): Promise<Todo[]> {
  try {
    const response = await instance.get<Todo[]>('todos');
    return response.body;
  } catch (err) {
    throw externalApiError('Error on service requesting todos', err);
  }
}

export async function findById(id: string): Promise<Todo> {
  try {
    const response = await instance.get<Todo>(`todos/${id}`);
    return response.body;
  } catch (err) {
    throw externalApiError(`Error on service requesting todo. Id ${id}`, err);
  }
}
