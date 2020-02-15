import faker from 'faker';

import * as userService from '../../src/services/users';

const defaultUser = {
  username: faker.internet.userName(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email()
};

export function create(params: userService.UserParams): Promise<userService.UserEntity> {
  return userService.create({ ...defaultUser, ...params });
}
