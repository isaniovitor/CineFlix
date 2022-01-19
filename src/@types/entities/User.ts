import type { GenderProps } from './Gender';

export interface DataProps {
  username: string;
  lastname: string;
  password: string;
  email: string;
  birthdate: string;
  address: string;
  gender: GenderProps;
  userimage: string;
}
