import { all, takeLatest, call, put } from 'redux-saga/effects';

import { searchFilms } from '~/services/film';
import { searchFilmCategory } from '~/services/filmCategory';

import {
  getFilmCategoryErrorAction,
  getFilmCategorySuccessAction,
} from './actions';
import type { GetFilmCategoryProps } from './types';
import { filmCategoryTypes } from './types';

export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status: number;
  statusText?: string;
}

function* getFilmCategortSagas(action: GetFilmCategoryProps) {
  try {
    const response: ResponseGenerator = yield call(
      searchFilmCategory,
      action.payload.path,
    );

    if (response.status >= 200 && response.status < 300) {
      const filmCategory = response.data.genres;

      yield put(getFilmCategorySuccessAction(filmCategory));
    } else {
      yield put(getFilmCategoryErrorAction());
    }
  } catch {
    yield put(getFilmCategoryErrorAction());
  }
}

export default function* watchSaga() {
  yield all([
    takeLatest(filmCategoryTypes.GET_FILMCATEGORY, getFilmCategortSagas),
  ]);
}
