import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Category from '~/components/Category';
import Film from '~/components/Film';
import HomeHero from '~/components/HomeHero';

import type { AplicationState } from '~/@types/entities/AplicationState';
import type { FilmProps } from '~/@types/entities/Film';
import type { FilmCategoryProps } from '~/@types/entities/FilmCategory';
import type { listCategoryFilmsProps } from '~/@types/entities/listCategoryFilms';
import {
  GET_FILMS_WITH_FILTERS,
  IMAGE_POSTER_URL,
  SEARCH_FILMS,
} from '~/constants/api';
import { FILM_DETAILS_SCREEN, PROFILE_SCREEN } from '~/constants/routes';
import request from '~/services/request';
import {
  getFilmsAction,
  getFilmsSuccessAction,
} from '~/store/ducks/film/actions';
import type { ResponseGenerator } from '~/store/ducks/film/sagas';
import { getListCategoryFilmsSagas } from '~/store/ducks/listCategoryFilms/sagas';

import { FilmCategorys } from './utils/mock';

import * as S from './styles';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(false);
  const [popularFilms, setPopularFilms] = useState<FilmProps[] | []>([]);
  const [popularFilmsImages, setPopularFilmsImages] = useState<string[] | []>(
    [],
  );
  const [listCategoryFilter, setListCategoryFilter] = useState<
    listCategoryFilmsProps[] | []
  >([]);
  const { listFilms } = useSelector((state: AplicationState) => state.film);
  const { listCategoryFilms, loadingFilm } = useSelector(
    (state: AplicationState) => state.listCategoryFilms,
  );
  const [currentListCategoryFilms, setCurrentListCategoryFilms] = useState<
    listCategoryFilmsProps[] | []
  >(listCategoryFilms);

  const handleProfile = useCallback(() => {
    navigation.navigate(PROFILE_SCREEN);
  }, [navigation]);

  function handleDetails(film: FilmProps) {
    navigation.navigate(FILM_DETAILS_SCREEN, { currentFilm: film });
  }

  function showModal() {
    setVisible(true);
  }

  // ta errado
  function getFilms(page: number, category: FilmCategoryProps) {
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

    getListCategoryFilmsSagas(action);
  }

  function filterCategory(category: FilmCategoryProps) {
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

  async function getPopular() {
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
      console.tron.log('deu ruim');
    }
  }

  const handleSearchBooks = useCallback(async () => {
    if (search === '') {
      dispatch(getFilmsSuccessAction([]));
    } else {
      dispatch(getFilmsAction(SEARCH_FILMS, `query=${search}`, '', 0));
    }
  }, [dispatch, search]);

  useEffect(() => {
    navigation.setOptions({
      iconProfile: true,
      iconProfileAction: handleProfile,
      search,
      setSearch,
      handleSearchBooks,
    });
  }, [navigation, handleProfile, search, handleSearchBooks]);

  useEffect(() => {
    getPopular();
  }, []);

  // useEffect(() => {
  //   if (listCategoryFilter.length > 0) {
  //     setCurrentListCategoryFilms(listCategoryFilter);
  //   } else {
  //     setCurrentListCategoryFilms(listCategoryFilms);
  //   }
  // }, [listCategoryFilms, listCategoryFilter, setCurrentListCategoryFilms]);

  return (
    <S.Container>
      {listFilms.length > 0 ? (
        <FlatList
          key="_"
          numColumns={3}
          style={{ padding: 20 }}
          contentContainerStyle={{
            alignItems: 'center',
          }}
          data={listFilms}
          extraData={listFilms}
          renderItem={({ film }) => (
            <Film CurrentFilm={film} handleFilm={handleDetails} />
          )}
          keyExtractor={(itemFilm: any, index: any) => index}
        />
      ) : (
        <FlatList
          key="#"
          ListHeaderComponent={
            <HomeHero
              images={popularFilmsImages}
              visible={visible}
              setVisible={setVisible}
              imagesLinks={popularFilms}
              onCurrentImage={handleDetails}
              modal={showModal}
              filter={filterCategory}
              list={FilmCategorys}
              listedItem={listCategoryFilter}
            />
          }
          showsVerticalScrollIndicator={false}
          style={{ padding: 20 }}
          data={currentListCategoryFilms}
          extraData={currentListCategoryFilms}
          renderItem={category => (
            <Category
              CurrentCategory={category.item}
              onRefre={getFilms}
              OnPressFilm={handleDetails}
            />
          )}
          keyExtractor={(itemCategory: any, index: any) => index}
        />
      )}
    </S.Container>
  );
};

export default Home;
