import request from 'supertest';
import app from '../../src/app';

import { encode } from '../../src/services/session-manager';
import { create as createUser } from '../factories/user';

describe('todos controller', () => {
  let token: string;

  beforeEach(async (done: jest.DoneCallback) => {
    const user = await createUser({ password: '12345678' });
    token = encode(user);
    done();
  });

  describe('/todos GET', () => {
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
