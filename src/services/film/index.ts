import {
  GET_FILMS_WITH_FILTERS,
  GET_IMAGE_FILMS,
  SEARCH_FILMS,
} from '~/constants/api';

import request from '../request';

// passar aq filter
export const searchFilms = async (
  path: string,
  query: string,
  filter: string,
  index: number,
) => {
  try {
    const response = await request.get(path, query, filter, index);
    return response;
  } catch {
    return null;
  }
};
