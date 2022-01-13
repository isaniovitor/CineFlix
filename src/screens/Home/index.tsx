import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import type { FilmCategoryProps } from '~/@types/entities/FilmCategory';
import film from '~/assets/image.jpg';
import { PROFILE_SCREEN } from '~/constants/routes';

import { FilmCategorys } from './utils/mock';

import * as S from './styles';

const Home: React.FC = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  const handleProfile = useCallback(() => {
    navigation.navigate(PROFILE_SCREEN);
  }, [navigation]);

  const handleDetails = useCallback(() => {
    navigation.navigate(PROFILE_SCREEN);
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions({
      iconProfile: true,
      iconProfileAction: handleProfile,
      search,
      setSearch,
    });
  }, [navigation, handleProfile, search]);

  // renders
  // function renderFilm({ item }: any) {
  //   return (
  //     <S.FilmConteiner>
  //       <S.ImageFilm> </S.ImageFilm>
  //     </S.FilmConteiner>
  //   );
  // }

  function renderCategory(item: any) {
    // console.log(item);
    return (
      <>
        <S.CategoryName>{item.item.name}</S.CategoryName>
        <TouchableOpacity onPress={() => handleDetails()}>
          <S.ImageFilme source={film} />
        </TouchableOpacity>

        {/* <FlatList
            style={{ paddingTop: 20 }}
            data={item.listItems}
            extraData={item.listItems}
            renderItem={renderFilm}
            keyExtractor={(itemCategory: any, index: any) => index}
          /> */}
      </>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ padding: 20 }}
        data={FilmCategorys}
        extraData={FilmCategorys}
        renderItem={renderCategory}
        keyExtractor={(itemCategory: any, index: any) => index}
      />
    </View>
  );
};

export default Home;
