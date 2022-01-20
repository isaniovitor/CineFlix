import React, { useContext, useState } from 'react';
import { Text, TextBase, TextInputBase } from 'react-native';
import { Portal, Modal } from 'react-native-paper';
import { ThemeContext } from 'styled-components/native';

import type { FilmCategoryProps } from '~/@types/entities/FilmCategory';
import type { listCategoryFilmsProps } from '~/@types/entities/listCategoryFilms';

import * as S from './styles';

interface Props {
  visible: boolean;
  setVisible: (show: boolean) => void;
  setItem: (item: any) => void;
  list: FilmCategoryProps[];
  listedItem: [] | listCategoryFilmsProps[];
}

const Select: React.FC<Props> = ({
  visible,
  setVisible,
  setItem,
  list,
  listedItem,
}) => {
  const hideModal = () => setVisible(false);
  const { Colors } = useContext(ThemeContext);

  const selectItem = (item: any) => {
    setItem(item);
    setVisible(false);
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={S.containerModal}
      >
        <S.Container style={{ backgroundColor: Colors.BACKGROUND_WHITE }}>
          {/* flatlist? */}
          {list.map(category => {
            const listCategory = listedItem.find(
              listedCategory => listedCategory.category.id === category.id,
            );

            return (
              <S.Button
                style={{ backgroundColor: Colors.BACKGROUND_BUTTON_WHITE }}
                key={category.id}
                onPress={() => selectItem(category)}
              >
                <S.TextButton
                  style={{
                    color: listCategory ? Colors.BACKGROUND_RED : Colors.BLACK,
                  }}
                >
                  {category.name}
                </S.TextButton>
              </S.Button>
            );
          })}
        </S.Container>
      </Modal>
    </Portal>
  );
};

export default Select;
