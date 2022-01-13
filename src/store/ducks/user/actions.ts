import { action } from 'typesafe-actions';

import type { GenderProps } from '~/@types/entities/Gender';

import type { LoginActionProps } from './types';
import { UserTypes } from './types';

export const changeProfileAction = (
  username: string,
  password: string,
  userimage: string,
  email: string,
  birthdate: string,
  gender: GenderProps,
): LoginActionProps =>
  action(UserTypes.USER_LOGIN, {
    username,
    password,
    userimage,
    email,
    birthdate,
    gender,
  });
