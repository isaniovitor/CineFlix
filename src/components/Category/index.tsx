import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';

import type { FilmProps } from '~/@types/entities/Film';
import type { FilmCategoryProps } from '~/@types/entities/FilmCategory';
import type { listCategoryFilmsProps } from '~/@types/entities/listCategoryFilms';

import Film from '../Film';

import * as S from './styles';

interface CategoryProps {
  CurrentCategory: listCategoryFilmsProps;
  categoryToLoad: FilmCategoryProps | undefined;
  setCategoryToLoad: (category: FilmCategoryProps | undefined) => void;
  onRefre: (page: number, category: FilmCategoryProps) => void;
  OnPressFilm: (item: FilmProps) => void;
}

const Category: React.FC<CategoryProps> = ({
  CurrentCategory,
  categoryToLoad,
  setCategoryToLoad,
  onRefre,
  OnPressFilm,
}) => {
  // const isLoading = categoryToLoad
  //   ? categoryToLoad.id === CurrentCategory.category.id
  //   : false;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isLoading = categoryToLoad
      ? categoryToLoad.id === CurrentCategory.category.id
      : false;
    setLoading(isLoading);
  }, [CurrentCategory.category.id, categoryToLoad]);

  // console.tron.log(
  //   'categoryToLoad',
  //   categoryToLoad.id,
  //   CurrentCategory.category.id,
  //   categoryToLoad.id === CurrentCategory.category.id,
  // );

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
        refreshing={loading}
        onRefresh={() => {
          setLoading(false);
          setCategoryToLoad(undefined);
          onRefre(CurrentCategory.currentPage + 1, CurrentCategory.category);
        }}
        onEndReached={() => {
          setLoading(false);
          setCategoryToLoad(undefined);
          onRefre(CurrentCategory.currentPage + 1, CurrentCategory.category);
        }}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

export default Category;
