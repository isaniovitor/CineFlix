import { action } from 'typesafe-actions';

import type { GenderProps } from '~/@types/entities/Gender';

import type { LoginActionProps, LogoutActionProps } from './types';
import { UserTypes } from './types';

export const changeProfileAction = (
  username: string,
  lastname: string,
  password: string,
  userimage: string,
  email: string,
  birthdate: string,
  address: string,
  gender: GenderProps,
): LoginActionProps =>
  action(UserTypes.USER_LOGIN, {
    username,
    lastname,
    password,
    userimage,
    email,
    birthdate,
    address,
    gender,
  });

export const logoutAction = (): LogoutActionProps =>
  action(UserTypes.USER_LOGOUT);
