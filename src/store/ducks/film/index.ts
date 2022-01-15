import type { Reducer } from 'redux';

import type { FilmState } from './types';
import { FilmTypes } from './types';

const INITIAL_STATE: FilmState = {
  listFilms: [],
  loading: false,
  errorGetFilms: false,
};

const reducer: Reducer<FilmState> = (
  state = INITIAL_STATE,
  { type, payload },
) => {
  switch (type) {
    case FilmTypes.GET_FILMS:
      return {
        ...state,
        loading: true,
      };
    case FilmTypes.GET_FILMS_SUCCESS:
      return {
        ...state,
        loading: false,
        listFilms: payload.listFilms,
        errorGetFilms: false,
      };
    case FilmTypes.GET_FILMS_ERROR:
      return {
        ...state,
        loading: false,
        listFilms: [],
        errorGetFilms: true,
      };
    default:
      return state;
  }
};

export default reducer;
