import request from 'supertest';

import app from '../../src/app';
import * as userService from '../../src/services/users';

import { create as createUser } from '../factories/user';

describe('users controller', () => {
  let defaultUser: userService.UserEntity;
  let res: request.Response;

  describe('/user GET', () => {
    describe('returning results', () => {
      beforeAll(async (done: jest.DoneCallback) => {
        defaultUser = await createUser({ password: '12345678' });
        res = await request(app).get('/user');
        done();
      });
      test('status code is 200', () => {
        expect(res.status).toBe(200);
      });
      test('body has users and count', () => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty('users');
        expect(res.body).toHaveProperty('count');
      });
      test('count equeals 1', () => {
        expect(res.body.count).toBe(1);
      });
      test('users length equeals 1', () => {
        expect(res.body.users).toBeInstanceOf(Array);
        expect(res.body.users.length).toBe(1);
      });
      test('users elements have correct type', () => {
        expect(res.body.users[0]).toHaveProperty('id');
        expect(res.body.users[0]).toHaveProperty('username');
        expect(res.body.users[0]).toHaveProperty('first_name');
        expect(res.body.users[0]).toHaveProperty('last_name');
        expect(res.body.users[0]).toHaveProperty('email');
        expect(res.body.users[0]).not.toHaveProperty('password');
      });
      test('users elements have correct values', () => {
        expect(res.body.users[0].id).toBe(defaultUser.id);
        expect(res.body.users[0].username).toBe(defaultUser.username);
        expect(res.body.users[0].first_name).toBe(defaultUser.firstName);
        expect(res.body.users[0].last_name).toBe(defaultUser.lastName);
        expect(res.body.users[0].email).toBe(defaultUser.email);
      });
    });
  });

  describe('/user/:id GET', () => {
    describe('returning results', () => {
      beforeAll(async (done: jest.DoneCallback) => {
        defaultUser = await createUser({ password: '12345678' });
        res = await request(app).get(`/user/${defaultUser.id}`);
        done();
      });
      test('status code is 200', () => {
        expect(res.status).toBe(200);
      });
      test('body has users and count', () => {
        expect(res.body).toBeInstanceOf(Object);
      });
      test('response have correct type', () => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('username');
        expect(res.body).toHaveProperty('first_name');
        expect(res.body).toHaveProperty('last_name');
        expect(res.body).toHaveProperty('email');
        expect(res.body).not.toHaveProperty('password');
      });
      test('response have correct values', () => {
        expect(res.body.id).toBe(defaultUser.id);
        expect(res.body.username).toBe(defaultUser.username);
        expect(res.body.first_name).toBe(defaultUser.firstName);
        expect(res.body.last_name).toBe(defaultUser.lastName);
        expect(res.body.email).toBe(defaultUser.email);
      });
    });
  });
});
