import { all, takeLatest, call, put, select } from 'redux-saga/effects';

import type { AplicationState } from '~/@types/entities/AplicationState';
import type { listCategoryFilmsProps } from '~/@types/entities/listCategoryFilms';
import { searchFilms } from '~/services/film';

import {
  getListCategoryFilmsErrorAction,
  getListCategoryFilmsSuccessAction,
} from './actions';
import type { GetListCategoryFilmsProps } from './types';
import { listCategoryFilmsTypes } from './types';

export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status: number;
  statusText?: string;
}

function* getListCategoryFilmsSagas(action: GetListCategoryFilmsProps) {
  try {
    const response: ResponseGenerator = yield call(
      searchFilms,
      action.payload.path,
      action.payload.query,
      action.payload.filter,
      action.payload.index,
    );

    if (response.status >= 200 && response.status < 300) {
      const { listCategoryFilms } = yield select(
        (state: AplicationState) => state.listCategoryFilms,
      );
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

      yield put(getListCategoryFilmsSuccessAction(newlistCategoryFilms));
    } else {
      yield put(getListCategoryFilmsErrorAction());
    }
  } catch {
    yield put(getListCategoryFilmsErrorAction());
  }
}

export default function* watchSaga() {
  yield all([
    takeLatest(
      listCategoryFilmsTypes.GET_LISTCATEGORYFILMS,
      getListCategoryFilmsSagas,
    ),
  ]);
}
