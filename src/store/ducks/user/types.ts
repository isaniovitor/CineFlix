import type { Action } from 'redux';

import type { GenderProps } from '~/@types/entities/Gender';

export enum UserTypes {
  USER_LOGIN = '@user/USER_LOGIN',
  USER_LOGOUT = '@user/USER_LOGOUT',
}

export interface UserState {
  username: string;
  lastname: string;
  password: string;
  userimage: string;
  email: string;
  birthdate: string;
  address: string;
  gender: GenderProps;
  islogged: boolean;
}

export interface LoginActionProps extends Action {
  type: UserTypes.USER_LOGIN;
  payload: {
    username: string;
    lastname: string;
    password: string;
    userimage: string;
    birthdate: string;
    address: string;
    gender: GenderProps;
    email: string;
  };
}

export interface LogoutActionProps extends Action {
  type: UserTypes.USER_LOGOUT;
}
