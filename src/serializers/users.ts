/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { User } from '../db/entities/User';

export const serializeUserDetail = (user: User) => ({
  id: user.id,
  username: user.username,
  first_name: user.firstName,
  last_name: user.lastName,
  email: user.email
});

export const serializeUserList = (users: User[]) => users.map(serializeUserDetail);
