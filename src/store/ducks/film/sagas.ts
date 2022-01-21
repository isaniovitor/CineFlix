import { all, takeLatest, call, put, select } from 'redux-saga/effects';

import type { AplicationState } from '~/@types/entities/AplicationState';
import { searchFilms } from '~/services/film';

import { getFilmsSuccessAction, getFilmsErrorAction } from './actions';
import type { GetBooksProps } from './types';
import { FilmTypes } from './types';

export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status: number;
  statusText?: string;
}

function* getBooksSagas(action: GetBooksProps) {
  try {
    const response: ResponseGenerator = yield call(
      searchFilms,
      action.payload.path,
      action.payload.query,
      action.payload.filter,
      action.payload.index,
    );

    if (response.status >= 200 && response.status < 300) {
      let films = [];
      const { listFilms } = yield select(
        (state: AplicationState) => state.film,
      );

      if (action.payload.index === 0) {
        films = response.data.results;
      } else {
        films = [...listFilms, ...response.data.results];
      }

      yield put(getFilmsSuccessAction(films));
    } else {
      yield put(getFilmsErrorAction());
    }
  } catch {
    yield put(getFilmsErrorAction());
  }
}

export default function* watchSaga() {
  yield all([takeLatest(FilmTypes.GET_FILMS, getBooksSagas)]);
}
