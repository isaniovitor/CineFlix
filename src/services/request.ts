import { KEY } from '~/constants/api';

import api from './api';

const language = 'pt-BR';

export default {
  async get(
    path: string,
    query: string,
    filter: string,
    page: number | string,
  ) {
    const url = `/${path}?api_key=${KEY}${query ? `&${query}` : ''}${
      filter ? `&${filter}` : ''
    }&language=${language}${page ? `&page=${page}` : ''};`;

    return api.get(url);
  },
};
