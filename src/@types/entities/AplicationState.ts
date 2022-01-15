import type { FilmState } from '~/store/ducks/film/types';
import type { FontState } from '~/store/ducks/font/types';
import type { ListCategoryFilmsState } from '~/store/ducks/listCategoryFilms/types';
import type { ThemeState } from '~/store/ducks/theme/types';
import type { UserState } from '~/store/ducks/user/types';

export interface AplicationState {
  theme: ThemeState;
  font: FontState;
  user: UserState;
  film: FilmState;
  listCategoryFilms: ListCategoryFilmsState;
}
