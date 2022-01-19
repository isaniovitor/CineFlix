import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useEffect } from 'react';

import Button from '~/components/Button';

import type { FilmProps } from '~/@types/entities/Film';
import filmBg from '~/assets/image.jpg';

import * as S from './styles';

const FilmDetails: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { currentFilm }: FilmProps = route.params;

  function handleWatchMovie() {
    // ??
  }

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
              : filmBg
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
      <S.Recommendations>
        <Button label="Assitir" actionBtn={() => handleWatchMovie()} />
      </S.Recommendations>
    </S.Container>
  );
};

export default FilmDetails;
