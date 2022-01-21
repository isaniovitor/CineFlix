import { all, fork } from 'redux-saga/effects';

import film from '../ducks/film/sagas';
import filmCategory from '../ducks/filmCategory/sagas';

export default function* rootSaga() {
  yield all([fork(film), fork(filmCategory)]);
}
