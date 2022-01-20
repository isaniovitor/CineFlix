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

export function Select({
  visible,
  setVisible,
  setItem,
  list,
  listedItem,
}: Props) {
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
        <S.Container
          style={{ backgroundColor: Colors.BACKGROUND_BUTTON_WHITE }}
        >
          {/* flatlist? */}
          {list.map(category => {
            const listCategory = listedItem.find(
              listedCategory => listedCategory.category.id === category.id,
            );

            return (
              <S.Button key={category.id} onPress={() => selectItem(category)}>
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
}

export default Select;

// import type { PickerProps } from '@react-native-picker/picker';
// import { Picker } from '@react-native-picker/picker';
// import React, { useContext } from 'react';
// import { ThemeContext } from 'styled-components/native';

// import { FilmCategorys } from '~/screens/Home/utils/mock';

// import * as S from './styles';

// interface SelectProps {
//   title: string;
// }

// const Select: React.FC<PickerProps & SelectProps> = ({
//   title,
//   ...rest
// }: SelectProps) => {
//   const { Colors } = useContext(ThemeContext);

//   return (
//     <S.Container>
//       {/* <S.IconSelect /> */}
//       <S.ContainerSelect>
//         <S.SelectPicker {...rest} dropdownIconColor={Colors.ICON_COLOR}>
//           {FilmCategorys.map(gender => {
//             return (
//               <Picker.Item
//                 label={gender.name}
//                 value={gender.id}
//                 key={gender.id}
//                 style={{
//                   backgroundColor: Colors.BACKGROUND,
//                   color: Colors.FONT_COLOR_DARK,
//                 }}
//               />
//             );
//           })}
//         </S.SelectPicker>
//       </S.ContainerSelect>
//     </S.Container>
//   );
// };

// export default Select;
