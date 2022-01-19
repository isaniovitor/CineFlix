import React from 'react';
import { SliderBox } from 'react-native-image-slider-box';

import type { FilmProps } from '~/@types/entities/Film';
import type { FilmCategoryProps } from '~/@types/entities/FilmCategory';
import type { listCategoryFilmsProps } from '~/@types/entities/listCategoryFilms';

import Select from '../Picker';

import * as S from './styles';

interface HomeHeroProps {
  visible: boolean;
  setVisible: (show: boolean) => void;
  images: string[];
  imagesLinks: FilmProps[];
  onCurrentImage: (item: FilmProps) => void;
  modal: () => void;
  filter: (category: FilmCategoryProps) => void;
  list: FilmCategoryProps[];
  listedItem: listCategoryFilmsProps[];
}

const HomeHero: React.FC<HomeHeroProps> = ({
  images,
  visible,
  setVisible,
  imagesLinks,
  onCurrentImage,
  modal,
  filter,
  list,
  listedItem,
}) => {
  return (
    <>
      <SliderBox
        images={images}
        dotStyle={{ display: 'none' }}
        autoplay
        circleLoop
        ImageComponentStyle={{ padding: 20 }}
        onCurrentImagePressed={index => onCurrentImage(imagesLinks[index])}
      />

      <S.FilterConteiner onPress={() => modal()}>
        <Select
          visible={visible}
          setVisible={setVisible}
          setItem={category => {
            filter(category);
          }}
          list={list}
          listedItem={listedItem}
        />
        <S.FilterIcon />
      </S.FilterConteiner>
    </>
  );
};

export default HomeHero;
