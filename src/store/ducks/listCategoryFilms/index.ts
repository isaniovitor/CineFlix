import type { Reducer } from 'redux';

import type { ListCategoryFilmsState } from './types';
import { listCategoryFilmsTypes } from './types';

const INITIAL_STATE: ListCategoryFilmsState = {
  listCategoryFilms: [],
  loadingFilm: false,
  errorGetListCategoryFilms: false,
};

const reducer: Reducer<ListCategoryFilmsState> = (
  state = INITIAL_STATE,
  { type, payload },
) => {
  switch (type) {
    case listCategoryFilmsTypes.GET_LISTCATEGORYFILMS:
      return {
        ...state,
        loadingFilm: true,
      };
    case listCategoryFilmsTypes.GET_LISTCATEGORYFILMS_SUCCESS:
      return {
        ...state,
        loadingFilm: false,
        listCategoryFilms: payload.listCategoryFilms,
        errorGetListCategoryFilms: false,
      };
    case listCategoryFilmsTypes.GET_LISTCATEGORYFILMS_ERROR:
      return {
        ...state,
        loadingFilm: false,
        listCategoryFilms: [],
        errorGetListCategoryFilms: true,
      };
    default:
      return state;
  }
};

export default reducer;
