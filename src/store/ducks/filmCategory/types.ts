import type { Action } from 'redux';

import type { FilmProps } from '~/@types/entities/Film';
import type { FilmCategoryProps } from '~/@types/entities/FilmCategory';
import type { listCategoryFilmsProps } from '~/@types/entities/listCategoryFilms';

export enum filmCategoryTypes {
  GET_FILMCATEGORY = '@filmCategory/GET_FILMCATEGORY',
  GET_FILMCATEGORY_SUCCESS = '@filmCategory/GET_FILMCATEGORY_SUCCESS',
  GET_FILMCATEGORY_ERROR = '@filmCategory/GET_FILMCATEGORY_ERROR',
}

export interface FilmCategoryState {
  filmCategory: FilmCategoryProps[];
  loading: boolean;
  errorGetFilmCategory: boolean;
}

export interface GetFilmCategoryProps extends Action {
  type: filmCategoryTypes.GET_FILMCATEGORY;
  payload: {
    path: string;
    query: string;
    filter: string;
    index: string;
  };
}

export interface GetFilmCategorySuccessProps extends Action {
  type: filmCategoryTypes.GET_FILMCATEGORY_SUCCESS;
  payload: { filmCategory: FilmCategoryProps[] };
}

export interface GetFilmCategoryErrorProps extends Action {
  type: filmCategoryTypes.GET_FILMCATEGORY_ERROR;
}
