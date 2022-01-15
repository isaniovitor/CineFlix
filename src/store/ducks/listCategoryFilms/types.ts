import type { Action } from 'redux';

import type { FilmProps } from '~/@types/entities/Film';
import type { FilmCategoryProps } from '~/@types/entities/FilmCategory';
import type { listCategoryFilmsProps } from '~/@types/entities/listCategoryFilms';

export enum listCategoryFilmsTypes {
  GET_LISTCATEGORYFILMS = '@listCategoryFilms/GET_LISTCATEGORYFILMS',
  GET_LISTCATEGORYFILMS_SUCCESS = '@listCategoryFilms/GET_LISTCATEGORYFILMS_SUCCESS',
  GET_LISTCATEGORYFILMS_ERROR = '@listCategoryFilms/GET_LISTCATEGORYFILMS_ERROR',
}

export interface ListCategoryFilmsState {
  listCategoryFilms: listCategoryFilmsProps[];
  loadingFilm: boolean;
  errorGetListCategoryFilms: boolean;
}

export interface GetListCategoryFilmsProps extends Action {
  type: listCategoryFilmsTypes.GET_LISTCATEGORYFILMS;
  payload: {
    path: string;
    query: string;
    filter: string;
    index: number;
    category: FilmCategoryProps;
  };
}

export interface GetListCategoryFilmsSuccessProps extends Action {
  type: listCategoryFilmsTypes.GET_LISTCATEGORYFILMS_SUCCESS;
  payload: { listCategoryFilms: listCategoryFilmsProps[] };
}

export interface GetListCategoryFilmsErrorProps extends Action {
  type: listCategoryFilmsTypes.GET_LISTCATEGORYFILMS_ERROR;
}
