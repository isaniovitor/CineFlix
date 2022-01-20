import type { Reducer } from 'redux';

import type { FilmCategoryState } from './types';
import { filmCategoryTypes } from './types';

const INITIAL_STATE: FilmCategoryState = {
  filmCategory: [],
  loading: false,
  errorGetFilmCategory: false,
};

const reducer: Reducer<FilmCategoryState> = (
  state = INITIAL_STATE,
  { type, payload },
) => {
  switch (type) {
    case filmCategoryTypes.GET_FILMCATEGORY:
      return {
        ...state,
        loading: true,
      };
    case filmCategoryTypes.GET_FILMCATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        filmCategory: payload.filmCategory,
        errorGetFilmCategory: false,
      };
    case filmCategoryTypes.GET_FILMCATEGORY_ERROR:
      return {
        ...state,
        loading: false,
        filmCategory: [],
        errorGetFilmCategory: true,
      };
    default:
      return state;
  }
};

export default reducer;
