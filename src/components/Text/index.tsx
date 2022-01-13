import React from 'react';
import type { TextProps } from 'react-native';
import { useSelector } from 'react-redux';

import type { AplicationState } from '~/@types/entities/AplicationState';

// import type { ApplicationState } from '~/store';

import * as S from './styles';

interface NewTextProps {
  fontSize?: number;
}

const NewText: React.FC<NewTextProps & TextProps> = ({
  fontSize = 16,
  children,
  ...rest
}) => {
  const { delta } = useSelector((state: AplicationState) => state.font);

  return (
    <S.Text {...rest} customFontSize={fontSize + delta}>
      {children}
    </S.Text>
  );
};

export default NewText;
