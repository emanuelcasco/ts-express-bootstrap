import axios from 'axios';

import { externalApiError } from '../api/errors';
import config from '../config';

export const BASE_URL = config.todosExternalApi.baseUrl as string;

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const instance = axios.create({
  baseURL: BASE_URL,
  responseType: 'json'
});

export async function findAll(): Promise<Todo[]> {
  try {
    const { data: todoList } = await instance.get<Todo[]>('/todos');
    return todoList;
  } catch (err) {
    throw externalApiError('Error on service requesting todos', err);
  }
}

export async function findById(id: string): Promise<Todo> {
  try {
    const { data: todoItem } = await instance.get<Todo>(`/todos/${id}`);
    return todoItem;
  } catch (err) {
    throw externalApiError(`Error on service requesting todo. Id ${id}`, err);
  }
}
