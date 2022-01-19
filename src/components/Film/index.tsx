import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import type { FilmProps } from '~/@types/entities/Film';
import filmBg from '~/assets/image.jpg';

import * as S from './styles';

interface Props {
  CurrentFilm: FilmProps;
  handleFilm: (item: FilmProps) => void;
}

const Film: React.FC<Props> = ({ CurrentFilm, handleFilm }) => {
  return (
    <TouchableOpacity onPress={() => handleFilm(CurrentFilm)}>
      <View style={{ paddingRight: 5, paddingBottom: 5 }}>
        <S.ImageFilm
          source={
            CurrentFilm.backdrop_path
              ? {
                  uri: `https://image.tmdb.org/t/p/original/${CurrentFilm.backdrop_path}`,
                }
              : filmBg
          }
        />
      </View>
    </TouchableOpacity>
  );
};

export default Film;
