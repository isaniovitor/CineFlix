import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SliderBox } from 'react-native-image-slider-box';
import { useDispatch, useSelector } from 'react-redux';

import { Picker } from '~/components/DropDown';
import Indicator from '~/components/Indicator';

import type { AplicationState } from '~/@types/entities/AplicationState';
import type { FilmProps } from '~/@types/entities/Film';
import type { FilmCategoryProps } from '~/@types/entities/FilmCategory';
import type { listCategoryFilmsProps } from '~/@types/entities/listCategoryFilms';
import filmBg from '~/assets/image.jpg';
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
import { getListCategoryFilmsAction } from '~/store/ducks/listCategoryFilms/actions';

import { FilmCategorys } from './utils/mock';

import * as S from './styles';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [popularFilmsImages, setPopularFilmsImages] = useState<string[] | []>(
    [],
  );
  const [listCategoryFilter, setListCategoryFilter] = useState<
    listCategoryFilmsProps[] | []
  >([]);
  const [currentCategoryFilter, setCurrentCategoryFilter] =
    useState<FilmCategoryProps>({ id: -1, name: '' });
  const [currentListCategoryFilms, setCurrentListCategoryFilms] = useState<
    listCategoryFilmsProps[] | []
  >([]);
  const [popularFilms, setPopularFilms] = useState<FilmProps[] | []>([]);
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

  // ta errado
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

  console.tron.log('listCategoryFilter', listCategoryFilter[0]);

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
          {/* <S.ResumeContainer>
            <S.FilmName>{item.item.original_title.substring(0, 25)}</S.FilmName>
            <S.FilmResume>
              {item.item.overview.substring(0, 70)}...
            </S.FilmResume>
          </S.ResumeContainer> */}
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
          // showsHorizontalScrollIndicator={false}
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
          key="_"
          numColumns={3}
          style={{ padding: 20 }}
          contentContainerStyle={{
            alignItems: 'center',
          }}
          data={listFilms}
          extraData={listFilms}
          renderItem={renderFilm}
          keyExtractor={(itemFilm: any, index: any) => index}
        />
      ) : (
        <>
          <FlatList
            key="#"
            ListHeaderComponent={
              <>
                <SliderBox
                  images={popularFilmsImages}
                  dotStyle={{ display: 'none' }}
                  autoplay
                  circleLoop
                  ImageComponentStyle={{ padding: 20 }}
                  // dotColor={white}
                  onCurrentImagePressed={handleDetails}
                />
                <Picker
                  itemSelect={currentCategoryFilter}
                  setItem={category => {
                    filterCategory(category);
                    setCurrentCategoryFilter(category);
                  }}
                  genders={FilmCategorys}
                  disabled={false}
                />
              </>
            }
            showsVerticalScrollIndicator={false}
            style={{ padding: 20 }}
            data={currentListCategoryFilms}
            extraData={currentListCategoryFilms}
            renderItem={renderCategory}
            keyExtractor={(itemCategory: any, index: any) => index}
          />
        </>
      )}
    </View>
  );
};

export default Home;
