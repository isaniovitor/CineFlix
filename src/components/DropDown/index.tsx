import React, { useContext, useState } from 'react';
import { FlatList } from 'react-native';
import { ThemeContext } from 'styled-components/native';

import type { GenderProps } from '~/@types/entities/Gender';

import * as S from './styles';

interface Props {
  itemSelect: any;
  setItem: (item: any) => void;
  list: any[];
  title?: string;
  disabled: boolean;
}

export function Picker({ itemSelect, setItem, list, title, disabled }: Props) {
  const [showList, setShowList] = useState(false);
  const { Colors } = useContext(ThemeContext);

  const selectItem = (item: any) => {
    setItem(item);
    setShowList(false);
  };

  return (
    <S.Container>
      <S.ContainerPicker>
        {title && <S.Title>{title}</S.Title>}

        {!showList ? (
          <S.Touchable
            disabled={disabled}
            onPress={() => setShowList(!showList)}
          >
            <S.PlaceholderText>
              {itemSelect?.name || 'Selecione a categoria'}
            </S.PlaceholderText>
            <S.IconPicker
              color={Colors.BLACK_TO_WHITE_TEXT}
              size={20}
              type="font-5"
              name={showList ? 'angle-up' : 'angle-down'}
            />
          </S.Touchable>
        ) : (
          <S.ShowListConteiner>
            {list.map(item => {
              return (
                <S.Touchable
                  key={item.id || item.name}
                  onPress={() => selectItem(item)}
                >
                  <S.ContainerList>
                    <S.TitleItem>{item.name}</S.TitleItem>
                  </S.ContainerList>
                </S.Touchable>
              );
            })}
          </S.ShowListConteiner>
        )}
      </S.ContainerPicker>
    </S.Container>
  );
}

export default Picker;
