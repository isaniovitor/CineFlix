import type { FontState } from '~/store/ducks/font/types';
import type { ThemeState } from '~/store/ducks/theme/types';
import type { UserState } from '~/store/ducks/user/types';

export interface AplicationState {
  theme: ThemeState;
  font: FontState;
  user: UserState;
}
