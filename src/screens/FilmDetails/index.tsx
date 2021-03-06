import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useEffect } from 'react';
import { Text } from 'react-native';

import Button from '~/components/Button';

import type { FilmProps } from '~/@types/entities/Film';
import noImage from '~/assets/no_image.jpg';

import * as S from './styles';

const FilmDetails: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { currentFilm }: FilmProps = route.params;

  useEffect(() => {
    navigation.setOptions({
      enableNavigation: true,
    });
  }, [navigation]);

  return (
    <S.Container>
      <S.Hero>
        <S.PosterFilm
          source={
            currentFilm.poster_path
              ? {
                  uri: `https://image.tmdb.org/t/p/original/${currentFilm.backdrop_path}`,
                }
              : noImage
          }
        />
      </S.Hero>
      <S.Description>
        <S.FilmName>{currentFilm.title}</S.FilmName>
        <S.NumbersConteiner>
          <S.ItemNumbers>
            <S.StarIcon />
            <S.TextNumbers>{currentFilm.vote_average}</S.TextNumbers>
          </S.ItemNumbers>
          <S.ItemNumbers>
            <S.PersonIcon />
            <S.TextNumbers>{currentFilm.popularity}</S.TextNumbers>
          </S.ItemNumbers>
          <S.ItemNumbers>
            <S.CalendarIcon />
            <S.TextNumbers>{currentFilm.release_date}</S.TextNumbers>
          </S.ItemNumbers>
        </S.NumbersConteiner>
        <S.overview>{currentFilm.overview}</S.overview>
      </S.Description>
    </S.Container>
  );
};

export default FilmDetails;
