import type { Action } from 'redux';

import type { GenderProps } from '~/@types/entities/Gender';

export enum UserTypes {
  USER_LOGIN = '@user/USER_LOGIN',
}

export interface UserState {
  username: string;
  password: string;
  userimage: string;
  email: string;
  birthdate: string;
  gender: GenderProps;
  islogged: boolean;
}

export interface LoginActionProps extends Action {
  type: UserTypes.USER_LOGIN;
  payload: {
    username: string;
    password: string;
    userimage: string;
    birthdate: string;
    gender: GenderProps;
    email: string;
  };
}
