import type { listCategoryFilmsProps } from '~/@types/entities/listCategoryFilms';
import request from '~/services/request';
import store from '~/store';

import {
  getListCategoryFilmsSuccessAction,
  getListCategoryFilmsErrorAction,
} from '../actions';

export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status: number;
  statusText?: string;
}

export async function getListCategoryFilmsSagas(action: any) {
  try {
    const response: ResponseGenerator = await request.get(
      action.payload.path,
      action.payload.query,
      action.payload.filter,
      action.payload.index,
    );

    if (response.status >= 200 && response.status < 300) {
      const listCategoryFilms = action.list;
      const newlistCategoryFilms = listCategoryFilms;
      const isIntoList = listCategoryFilms.find(
        CategoryFilms =>
          CategoryFilms.category.id === action.payload.category.id,
      );

      if (isIntoList) {
        newlistCategoryFilms[newlistCategoryFilms.indexOf(isIntoList)] = {
          category: action.payload.category,
          films: [...isIntoList.films, ...response.data.results],
          currentPage: action.payload.index + 1,
        };
      } else {
        const newCategoryFilms: listCategoryFilmsProps = {
          category: action.payload.category,
          films: response.data.results,
          currentPage: action.payload.index,
        };

        newlistCategoryFilms.push(newCategoryFilms);
      }

      store.dispatch(getListCategoryFilmsSuccessAction(newlistCategoryFilms));
    } else {
      store.dispatch(getListCategoryFilmsErrorAction());
    }
  } catch {
    store.dispatch(getListCategoryFilmsErrorAction());
  }
}
