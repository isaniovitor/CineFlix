Documentação API: https://www.themoviedb.org/documentation/api;

"react-native-elements": "https://github.com/react-native-elements/react-native-elements#dist",

background: #181818;
background-color: #e50914;


import { all, takeLatest, call, put, select } from 'redux-saga/effects';

import type { AplicationState } from '~/@types/entities/AplicationState';
import type { FilmCategoryProps } from '~/@types/entities/FilmCategory';
import type { listCategoryFilmsProps } from '~/@types/entities/listCategoryFilms';
import { GET_FILMS_WITH_FILTERS } from '~/constants/api';
import { FilmCategorys } from '~/screens/Home/utils/mock';
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

// map aq
// map async
function* getFilms(itemCategory: FilmCategoryProps) {
  console.tron.log('aa');
  // yeld call
  const response: ResponseGenerator = yield call(
    searchFilms,
    GET_FILMS_WITH_FILTERS,
    '',
    `with_genres=${itemCategory.id}`,
    1,
  );

  if (response.status >= 200 && response.status < 300) {
    const { listCategoryFilms } = yield select(
      (state: AplicationState) => state.listCategoryFilms,
    );
    const newlistCategoryFilms = listCategoryFilms;
    const isIntoList = listCategoryFilms.find(
      Category => Category.category.id === itemCategory.id,
    );

    // console.tron.log('action.payload.category.id', action.payload.category);
    // console.tron.log('isIntoList', isIntoList);

    const newCategoryFilms: listCategoryFilmsProps = {
      category: itemCategory,
      films: response.data.results,
    };

    if (!isIntoList) newlistCategoryFilms.push(newCategoryFilms);

    yield put(getListCategoryFilmsSuccessAction(newlistCategoryFilms));
  } else {
    yield put(getListCategoryFilmsErrorAction());
  }
}

function* getListCategoryFilmsSagas() {
  try {
    FilmCategorys.map(itemCategory => {
      console.tron.log('itemCategory', itemCategory);
      getFilms(itemCategory);
      return null;
    });
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
