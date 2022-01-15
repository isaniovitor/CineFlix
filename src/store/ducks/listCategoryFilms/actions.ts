import { action } from 'typesafe-actions';

import type { FilmProps } from '~/@types/entities/Film';
import type { FilmCategoryProps } from '~/@types/entities/FilmCategory';
import type { listCategoryFilmsProps } from '~/@types/entities/listCategoryFilms';

import type {
  GetListCategoryFilmsProps,
  GetListCategoryFilmsSuccessProps,
  GetListCategoryFilmsErrorProps,
} from './types';
import { listCategoryFilmsTypes } from './types';

export const getListCategoryFilmsAction = (
  path: string,
  query: string,
  filter: string,
  index: number,
  category: FilmCategoryProps,
): GetListCategoryFilmsProps =>
  action(listCategoryFilmsTypes.GET_LISTCATEGORYFILMS, {
    path,
    query,
    filter,
    index,
    category,
  });

export const getListCategoryFilmsSuccessAction = (
  listCategoryFilms: listCategoryFilmsProps[],
): GetListCategoryFilmsSuccessProps =>
  action(listCategoryFilmsTypes.GET_LISTCATEGORYFILMS_SUCCESS, {
    listCategoryFilms,
  });

export const getListCategoryFilmsErrorAction =
  (): GetListCategoryFilmsErrorProps =>
    action(listCategoryFilmsTypes.GET_LISTCATEGORYFILMS_ERROR);
