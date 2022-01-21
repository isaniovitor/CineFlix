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
import { SEARCH_FILMS } from '~/constants/api';
import { FILM_DETAILS_SCREEN, PROFILE_SCREEN } from '~/constants/routes';
import {
  getFilmsAction,
  getFilmsSuccessAction,
} from '~/store/ducks/film/actions';

import { getPopular, filter, getFilms } from './utils';

import * as S from './styles';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(false);
  const [popularFilms, setPopularFilms] = useState<FilmProps[] | []>([]);
  const { listFilms } = useSelector((state: AplicationState) => state.film);
  const { filmCategory } = useSelector(
    (state: AplicationState) => state.filmCategory,
  );
  const { listCategoryFilms, loadingFilm } = useSelector(
    (state: AplicationState) => state.listCategoryFilms,
  );
  const [popularFilmsImages, setPopularFilmsImages] = useState<string[] | []>(
    [],
  );
  const [loadingCategory, setLoadingCategory] = useState<
    FilmCategoryProps | undefined
  >();
  const [listCategoryFilter, setListCategoryFilter] = useState<
    listCategoryFilmsProps[] | []
  >([]);
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

  // console.tron.log('categoryToLoad', loadingCategory);
  function filterCategory(category: FilmCategoryProps) {
    filter(
      category,
      listCategoryFilter,
      listCategoryFilms,
      setCurrentListCategoryFilms,
      setListCategoryFilter,
    );
  }

  function getFilmsCategory(
    page: number,
    category: FilmCategoryProps,
    setLoading: (category: FilmCategoryProps) => void,
  ) {
    getFilms(page, category, listCategoryFilms, setLoading);
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
    getPopular(setPopularFilmsImages, setPopularFilms);
  }, []);

  return (
    <S.Container>
      {listFilms.length > 0 ? (
        <FlatList
          key="_"
          numColumns={4}
          style={{ padding: 20 }}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}
          data={listFilms}
          extraData={listFilms}
          renderItem={film => (
            <Film CurrentFilm={film.item} handleFilm={handleDetails} />
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
              list={filmCategory}
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
              categoryToLoad={loadingCategory}
              setCategoryToLoad={setLoadingCategory}
              onRefre={getFilmsCategory}
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
