import { action } from 'typesafe-actions';

import type { FilmProps } from '~/@types/entities/Film';

import type {
  GetBooksErrorProps,
  GetBooksProps,
  GetBooksSuccessProps,
} from './types';
import { FilmTypes } from './types';

export const getFilmsAction = (
  path: string,
  query: string,
  filter: string,
  index: number,
): GetBooksProps => action(FilmTypes.GET_FILMS, { path, query, filter, index });

export const getFilmsSuccessAction = (
  listFilms: FilmProps[],
): GetBooksSuccessProps => action(FilmTypes.GET_FILMS_SUCCESS, { listFilms });

export const getFilmsErrorAction = (): GetBooksErrorProps =>
  action(FilmTypes.GET_FILMS_ERROR);
