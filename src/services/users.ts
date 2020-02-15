import { getRepository, FindConditions, DeepPartial } from 'typeorm';

import { databaseError, notFoundError } from '../api/errors';

import { User } from '../db/entities/User';

export type UserEntity = User;
export type UserParams = DeepPartial<User>;
export type UserFindConditions = FindConditions<User>;

export async function findAll(): Promise<{ users: User[]; count: number }> {
  try {
    const [users, count] = await getRepository(User).findAndCount();
    return { users, count };
  } catch (err) {
    throw databaseError('Error on database finding User list.', err);
  }
}

export async function findById(id: number): Promise<User | undefined> {
  try {
    const user = await getRepository(User).findOne(id);
    return user;
  } catch (err) {
    throw databaseError(`Error on database finding User. Id: ${id}.`, err);
  }
}

export async function findBy(criteria: FindConditions<User>): Promise<User | undefined> {
  try {
    const user = await getRepository(User).findOne(criteria);
    return user;
  } catch (err) {
    throw databaseError(`Error on database finding User. Criteria: ${JSON.stringify(criteria)}.`, err);
  }
}

export async function create(createParams: UserParams): Promise<User> {
  try {
    const userInstance = await getRepository(User).create(createParams);
    return getRepository(User).save(userInstance);
  } catch (err) {
    throw databaseError('', err);
  }
}

export async function update(criteria: UserParams, updateParams: UserParams): Promise<User> {
  try {
    const user = await getRepository(User).findOne(criteria);
    if (user) {
      getRepository(User).merge(user, updateParams);
      return getRepository(User).save(user);
    }
    throw notFoundError(`User with provided criteria was not found. Criteria: ${JSON.stringify(criteria)}.`);
  } catch (err) {
    throw databaseError('Error on database updating User.', err);
  }
}
