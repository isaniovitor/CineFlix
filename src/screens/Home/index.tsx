import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import Indicator from '~/components/Indicator';

import type { AplicationState } from '~/@types/entities/AplicationState';
import type { FilmCategoryProps } from '~/@types/entities/FilmCategory';
import filmBg from '~/assets/image.jpg';
import { GET_FILMS_WITH_FILTERS, SEARCH_FILMS } from '~/constants/api';
import { FILM_DETAILS_SCREEN, PROFILE_SCREEN } from '~/constants/routes';
import {
  getFilmsAction,
  getFilmsSuccessAction,
} from '~/store/ducks/film/actions';
import { getListCategoryFilmsAction } from '~/store/ducks/listCategoryFilms/actions';

import { FilmCategorys } from './utils/mock';

import * as S from './styles';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [initialIdCategory, setInitialIdCategory] = useState(5);
  const { listFilms } = useSelector((state: AplicationState) => state.film);
  const { listCategoryFilms, loadingFilm } = useSelector(
    (state: AplicationState) => state.listCategoryFilms,
  );

  const handleProfile = useCallback(() => {
    navigation.navigate(PROFILE_SCREEN);
  }, [navigation]);

  const handleDetails = useCallback(() => {
    navigation.navigate(FILM_DETAILS_SCREEN);
  }, [navigation]);

  // tentar juntar
  function dispatchListFilms(page: number) {
    dispatch(
      getListCategoryFilmsAction(
        GET_FILMS_WITH_FILTERS,
        '',
        `with_genres=${FilmCategorys[initialIdCategory].id}`,
        page,
        FilmCategorys[initialIdCategory],
      ),
    );

    setInitialIdCategory(initialIdCategory + 1);
  }

  function dispatchFilms(page: number, category: FilmCategoryProps) {
    dispatch(
      getListCategoryFilmsAction(
        GET_FILMS_WITH_FILTERS,
        '',
        `with_genres=${category.id}`,
        page,
        category,
      ),
    );

    setInitialIdCategory(initialIdCategory + 1);
  }

  const handleSearchBooks = useCallback(async () => {
    if (search === '') {
      dispatch(getFilmsSuccessAction([]));
    } else {
      dispatch(getFilmsAction(SEARCH_FILMS, `query=${search}`, '', 1));
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

  // renders
  function renderFilm(item: any) {
    return (
      <TouchableOpacity onPress={() => handleDetails()}>
        <S.FilmContainer>
          <S.ImageFilm
            source={
              item.item.backdrop_path
                ? {
                    uri: `https://image.tmdb.org/t/p/original/${item.item.backdrop_path}`,
                  }
                : filmBg
            }
          />
          <S.ResumeContainer>
            <S.FilmName>{item.item.original_title.substring(0, 25)}</S.FilmName>
            <S.FilmResume>
              {item.item.overview.substring(0, 70)}...
            </S.FilmResume>
          </S.ResumeContainer>
        </S.FilmContainer>
      </TouchableOpacity>
    );
  }

  function renderCategory(item: any) {
    return (
      <View style={{ paddingTop: 10 }}>
        <S.CategoryName>{item.item.category.name}</S.CategoryName>
        {/* <TouchableOpacity onPress={() => handleDetails()}>
          <S.ImageFilm source={film} />
        </TouchableOpacity> */}

        <FlatList
          horizontal
          data={item.item.films}
          extraData={item.item.films}
          renderItem={film => (
            <View style={{ paddingRight: 5 }}>
              <S.ImageFilm
                source={
                  film.item.backdrop_path
                    ? {
                        uri: `https://image.tmdb.org/t/p/original/${film.item.backdrop_path}`,
                      }
                    : filmBg
                }
              />
            </View>
          )}
          keyExtractor={(itemCategory: any, index: any) => index}
          refreshing={loadingFilm}
          onRefresh={() =>
            dispatchFilms(item.item.currentPage, item.item.category)
          }
          onEndReached={() =>
            dispatchFilms(item.item.currentPage, item.item.category)
          }
          onEndReachedThreshold={0.1}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {listFilms.length > 0 ? (
        <FlatList
          style={{ padding: 20 }}
          data={listFilms}
          extraData={listFilms}
          renderItem={renderFilm}
          keyExtractor={(itemCategory: any, index: any) => index}
        />
      ) : (
        <>
          <FlatList
            style={{ padding: 20 }}
            data={listCategoryFilms}
            extraData={listCategoryFilms}
            renderItem={renderCategory}
            keyExtractor={(itemCategory: any, index: any) => index}
            refreshing={loadingFilm}
            onRefresh={() => dispatchListFilms(1)}
            onEndReached={() => dispatchListFilms(1)}
            onEndReachedThreshold={0.1}
          />
        </>
      )}
    </View>
  );
};

export default Home;
