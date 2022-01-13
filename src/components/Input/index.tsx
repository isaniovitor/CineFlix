import React from 'react';
import type { TextInputProps } from 'react-native';
import { useSelector } from 'react-redux';

import type { AplicationState } from '~/@types/entities/AplicationState';

import * as S from './styles';

interface InputProps {
  label?: string;
  width: number;
  title?: string;
  iconRight?: string;
  iconLeft?: string;
  iconType?: string;
  error?: any;
  labelSameLine?: boolean;
  actionIcon?: () => void;
}

const Input: React.FC<TextInputProps & InputProps> = ({
  label,
  title,
  iconRight,
  iconLeft,
  labelSameLine,
  error,
  iconType,
  actionIcon,
  ...rest
}) => {
  const { delta } = useSelector((state: AplicationState) => state.font);

  return (
    <S.UpContainer>
      {title && <S.Title>{title}</S.Title>}

      <S.ContainerInputIcon>
        {iconLeft && <S.IconInput iconType={iconType} name={iconLeft} />}
        <S.Container labelSameLine={labelSameLine}>
          {label && <S.Label>{label}</S.Label>}
          <S.ContainerInput error={error} labelSameLine={labelSameLine}>
            <S.Input
              // inlineImageLeft='search_icon'
              {...rest}
              // returnKeyLabel="search"
              // returnKeyType="search"
              autoCapitalize="none"
              customFontSize={12 + delta}
              iconRight={iconRight}
            />
            {iconRight && (
              <S.Touchable onPress={() => actionIcon && actionIcon()}>
                <S.IconInput iconType={iconType} name={iconRight} />
              </S.Touchable>
            )}
          </S.ContainerInput>
        </S.Container>
      </S.ContainerInputIcon>

      {error && <S.ErrorMessage fontSize={12}>{error}</S.ErrorMessage>}
    </S.UpContainer>
  );
};

export default Input;
