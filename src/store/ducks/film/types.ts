import type { Action } from 'redux';

import type { FilmProps } from '~/@types/entities/Film';

export enum FilmTypes {
  GET_FILMS = '@film/GET_FILMS',
  GET_FILMS_SUCCESS = '@film/GET_FILMS_SUCCESS',
  GET_FILMS_ERROR = '@film/GET_FILMS_ERROR',
}

export interface FilmState {
  listFilms: FilmProps[];
  loading: boolean;
  errorGetFilms: boolean;
}

export interface GetBooksProps extends Action {
  type: FilmTypes.GET_FILMS;
  payload: { path: string; query: string; filter: string; index: number };
}

export interface GetBooksSuccessProps extends Action {
  type: FilmTypes.GET_FILMS_SUCCESS;
  payload: { listFilms: FilmProps[] };
}

export interface GetBooksErrorProps extends Action {
  type: FilmTypes.GET_FILMS_ERROR;
}
