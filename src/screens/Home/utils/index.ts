import { Alert } from 'react-native';

import type { FilmProps } from '~/@types/entities/Film';
import type { FilmCategoryProps } from '~/@types/entities/FilmCategory';
import type { listCategoryFilmsProps } from '~/@types/entities/listCategoryFilms';
import { GET_FILMS_WITH_FILTERS, IMAGE_POSTER_URL } from '~/constants/api';
import request from '~/services/request';
import type { ResponseGenerator } from '~/store/ducks/film/sagas';
import { getListCategoryFilmsSagas } from '~/store/ducks/listCategoryFilms/sagas';

export function getFilms(
  page: number,
  category: FilmCategoryProps,
  listCategoryFilms: listCategoryFilmsProps[],
  setLoadingCategory: (category: FilmCategoryProps) => void,
) {
  try {
    const action = {
      list: listCategoryFilms,
      payload: {
        path: GET_FILMS_WITH_FILTERS,
        query: '',
        filter: `with_genres=${category.id}`,
        index: page,
        category,
      },
    };

    setLoadingCategory(category);
    getListCategoryFilmsSagas(action);
  } catch {
    Alert.alert('Atenção:', `Ocorreu um erro ao buscar filmes`, [
      { text: 'OK' },
    ]);
  }
}

export function filter(
  category: FilmCategoryProps,
  listCategoryFilter: listCategoryFilmsProps[] | [],
  listCategoryFilms: listCategoryFilmsProps[],
  setCurrentListCategoryFilms: (
    listCategoryFilter: listCategoryFilmsProps[],
  ) => void,
  setListCategoryFilter: (
    listCategoryFilter: listCategoryFilmsProps[] | [],
  ) => void,
) {
  const newListCategoryFilter = listCategoryFilter;
  const listCategory = listCategoryFilms.find(
    CategoryFilms => CategoryFilms.category.id === category.id,
  );

  if (newListCategoryFilter.includes(listCategory)) {
    newListCategoryFilter.pop(listCategory);
  } else {
    newListCategoryFilter.push(listCategory);
  }

  // useeffect?
  if (listCategoryFilter.length > 0) {
    setCurrentListCategoryFilms(listCategoryFilter);
  } else {
    setCurrentListCategoryFilms(listCategoryFilms);
  }

  setListCategoryFilter(newListCategoryFilter);
}

export async function getPopular(
  setPopularFilmsImages: (images: string[]) => void,
  setPopularFilms: (listCategoryFilter: FilmProps[] | []) => void,
) {
  try {
    const urlImages: string[] = [];
    const response: ResponseGenerator = await request.get(
      'movie/popular',
      '',
      '',
      1,
    );

    response.data.results.map(film =>
      urlImages.push(`${IMAGE_POSTER_URL}${film.backdrop_path}`),
    );

    setPopularFilmsImages(urlImages);
    setPopularFilms(response.data.results);
  } catch {
    Alert.alert('Atenção:', `Ocorreu um erro ao buscar os filmes populares`, [
      { text: 'OK' },
    ]);
  }
}
