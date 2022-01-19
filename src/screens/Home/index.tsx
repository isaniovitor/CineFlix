import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SliderBox } from 'react-native-image-slider-box';
import { useDispatch, useSelector } from 'react-redux';

import { Picker } from '~/components/DropDown';
import Indicator from '~/components/Indicator';
import Select from '~/components/Picker';

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
  const [visible, setVisible] = useState(false);
  const [popularFilms, setPopularFilms] = useState<FilmProps[] | []>([]);
  const [initialIdCategory, setInitialIdCategory] = useState(5);
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

  // renders
  function renderFilm(item: any) {
    return (
      <TouchableOpacity onPress={() => handleDetails(item.item)}>
        <View style={{ paddingRight: 5, paddingBottom: 5 }}>
          <S.ImageFilm
            source={
              item.item.backdrop_path
                ? {
                    uri: `https://image.tmdb.org/t/p/original/${item.item.backdrop_path}`,
                  }
                : filmBg
            }
          />
        </View>
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
          renderItem={renderFilm}
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
                  onCurrentImagePressed={index =>
                    handleDetails(popularFilms[index])
                  }
                />

                <S.FilterConteiner onPress={() => showModal()}>
                  <Select
                    visible={visible}
                    setVisible={setVisible}
                    setItem={category => {
                      filterCategory(category);
                    }}
                    list={FilmCategorys}
                    listedItem={listCategoryFilter}
                  />
                  <S.FilterIcon />
                </S.FilterConteiner>
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
    </S.Container>
  );
};

export default Home;
