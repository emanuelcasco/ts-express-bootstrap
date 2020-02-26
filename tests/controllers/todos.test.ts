import request from 'supertest';
import nock from 'nock';

import app from '../../src/app';
import { encode } from '../../src/services/session-manager';
import { BASE_URL } from '../../src/services/todos';
import { create as createUser } from '../factories/user';

export const mockTodo = {
  userId: 1,
  id: 1,
  title: 'delectus aut autem',
  completed: false
};

export const mockTodos = [
  {
    user_id: 1,
    id: 1,
    title: 'delectus aut autem',
    completed: false
  }
];

describe('todos controller', () => {
  let token: string;

  beforeEach(async (done: jest.DoneCallback) => {
    const user = await createUser({ password: '12345678' });
    token = encode(user);
    done();
  });

  describe('/todos GET', () => {
    nock(BASE_URL).get('/todos', mockTodos);
    test('should return all todos', (done: jest.DoneCallback) => {
      request(app)
        .get('/todos')
        .set('Authorization', token)
        .then((res: request.Response) => {
          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Array);
          expect(res.body[0]).toBeInstanceOf(Object);
          expect(res.body[0]).toHaveProperty('id');
          expect(res.body[0]).toHaveProperty('user_id');
          expect(res.body[0]).toHaveProperty('title');
          expect(res.body[0]).toHaveProperty('completed');
          expect(res.body[0].id).toBe(mockTodo.id);
          expect(res.body[0].user_id).toBe(mockTodo.userId);
          expect(res.body[0].title).toBe(mockTodo.title);
          expect(res.body[0].completed).toBe(mockTodo.completed);
          done();
        });
    });
    test('should fail when an invalid token is provided', (done: jest.DoneCallback) => {
      request(app)
        .get('/todos')
        .set('Authorization', 'i am an invalid token')
        .then((res: request.Response) => {
          expect(res.status).toBe(401);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty('internal_code');
          expect(res.body).toHaveProperty('message');
          expect(res.body.internal_code).toBe('authentication_error');
          expect(res.body.message).toBe('Token provided is invalid!');
          done();
        });
    });
    test('should fail when no token is provided', (done: jest.DoneCallback) => {
      request(app)
        .get('/todos')
        .then((res: request.Response) => {
          expect(res.status).toBe(401);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty('internal_code');
          expect(res.body).toHaveProperty('message');
          expect(res.body.internal_code).toBe('authentication_error');
          expect(res.body.message).toBe('Token authorization is required!');
          done();
        });
    });
  });

  describe('/todos/:id GET', () => {
    nock(BASE_URL).get('/todos/1', mockTodo);
    test('should return todo by provided id', (done: jest.DoneCallback) => {
      request(app)
        .get('/todos/1')
        .set('Authorization', token)
        .then((res: request.Response) => {
          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty('id');
          expect(res.body).toHaveProperty('user_id');
          expect(res.body).toHaveProperty('title');
          expect(res.body).toHaveProperty('completed');
          expect(res.body.id).toBe(mockTodo.id);
          expect(res.body.user_id).toBe(mockTodo.userId);
          expect(res.body.title).toBe(mockTodo.title);
          expect(res.body.completed).toBe(mockTodo.completed);
          done();
        });
    });
    test('should fail when an invalid token is provided', (done: jest.DoneCallback) => {
      request(app)
        .get('/todos/1')
        .set('Authorization', 'i am an invalid token')
        .then((res: request.Response) => {
          expect(res.status).toBe(401);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty('internal_code');
          expect(res.body).toHaveProperty('message');
          expect(res.body.internal_code).toBe('authentication_error');
          expect(res.body.message).toBe('Token provided is invalid!');
          done();
        });
    });
    test('should fail when no token is provided', (done: jest.DoneCallback) => {
      request(app)
        .get('/todos/1')
        .then((res: request.Response) => {
          expect(res.status).toBe(401);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty('internal_code');
          expect(res.body).toHaveProperty('message');
          expect(res.body.internal_code).toBe('authentication_error');
          expect(res.body.message).toBe('Token authorization is required!');
          done();
        });
    });
  });
});
