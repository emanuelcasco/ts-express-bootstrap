/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as userService from '../services/users';

export const serializeUserDetail = (user: userService.UserEntity) => ({
  id: user.id,
  username: user.username,
  first_name: user.firstName,
  last_name: user.lastName,
  email: user.email
});

export const serializeUserList = (users: userService.UserEntity[]) => users.map(serializeUserDetail);
