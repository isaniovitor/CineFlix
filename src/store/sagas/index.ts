import { all, fork } from 'redux-saga/effects';

import film from '../ducks/film/sagas';
// import listCategoryFilms from '../ducks/listCategoryFilms/sagas';

export default function* rootSaga() {
  // yield == await
  yield all([fork(film)]);
}
