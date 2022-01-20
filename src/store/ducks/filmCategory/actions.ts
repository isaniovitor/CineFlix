import { action } from 'typesafe-actions';

import type { FilmCategoryProps } from '~/@types/entities/FilmCategory';

import type {
  GetFilmCategoryProps,
  GetFilmCategorySuccessProps,
  GetFilmCategoryErrorProps,
} from './types';
import { filmCategoryTypes } from './types';

export const getFilmCategoryAction = (
  path: string,
  query: string,
  filter: string,
  index: string,
): GetFilmCategoryProps =>
  action(filmCategoryTypes.GET_FILMCATEGORY, {
    path,
    query,
    filter,
    index,
  });

export const getFilmCategorySuccessAction = (
  filmCategory: FilmCategoryProps[],
): GetFilmCategorySuccessProps =>
  action(filmCategoryTypes.GET_FILMCATEGORY_SUCCESS, { filmCategory });

export const getFilmCategoryErrorAction = (): GetFilmCategoryErrorProps =>
  action(filmCategoryTypes.GET_FILMCATEGORY_ERROR);
