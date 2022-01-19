import React from 'react';
import { View, FlatList } from 'react-native';

import type { FilmProps } from '~/@types/entities/Film';
import type { FilmCategoryProps } from '~/@types/entities/FilmCategory';
import type { listCategoryFilmsProps } from '~/@types/entities/listCategoryFilms';

import Film from '../Film';

import * as S from './styles';

interface CategoryProps {
  CurrentCategory: listCategoryFilmsProps;
  onRefre: (page: number, category: FilmCategoryProps) => void;
  OnPressFilm: (item: FilmProps) => void;
}

const Category: React.FC<CategoryProps> = ({
  CurrentCategory,
  onRefre,
  OnPressFilm,
}) => {
  return (
    <View style={{ paddingTop: 10 }}>
      <S.CategoryName>{CurrentCategory.category.name}</S.CategoryName>
      <FlatList
        horizontal
        data={CurrentCategory.films}
        extraData={CurrentCategory.films}
        renderItem={film => (
          <Film CurrentFilm={film.item} handleFilm={OnPressFilm} />
        )}
        keyExtractor={(itemCategory: any, index: any) => index}
        refreshing={false}
        onRefresh={() =>
          onRefre(CurrentCategory.currentPage + 1, CurrentCategory.category)
        }
        onEndReached={() =>
          onRefre(CurrentCategory.currentPage + 1, CurrentCategory.category)
        }
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

export default Category;
