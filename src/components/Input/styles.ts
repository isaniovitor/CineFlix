import { reduce } from 'lodash';
import { StyleSheet } from 'react-native';
import { black } from 'react-native-paper/lib/typescript/styles/colors';
import { vs } from 'react-native-size-matters';
import styled from 'styled-components/native';

import Icon from '~/components/Icon';
import Text from '~/components/Text';

interface IconInputProps {
  name: string;
  iconType?: string;
}

interface ContainerProps {
  labelSameLine?: boolean;
}

interface ContainerInputProps {
  error: string;
  labelSameLine?: boolean;
}

interface TextInputProps {
  customFontSize: number;
  iconRight?: string;
}

export const UpContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
`;

export const ContainerInputIcon = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 15px;
  border-radius: 50px;
  /* background: ${({ theme }) => theme.Colors.BACKGROUND_WHITE}; */
  border-color: ${({ theme }) => theme.Colors.BORDER_INPUT};
  border-bottom-width: 1px;
`;

export const Touchable = styled.TouchableOpacity``;

export const Label = styled(Text).attrs(({ theme }) => ({
  fontSize: 12,
}))`
  color: ${({ theme }) => theme.Colors.SECONDARY_LIGHT_GRAY};
`;

export const Title = styled(Text).attrs(({ theme }) => ({
  fontSize: 16,
}))`
  padding-top: 10px;
  color: ${({ theme }) => theme.Colors.GRAY};

  width: 100%;
`;

export const ContainerInput = styled.View<ContainerInputProps & ContainerProps>`
  flex-direction: row;
  margin-top: ${({ labelSameLine }) => (labelSameLine ? 0 : 10)}px;
  margin-left: ${({ labelSameLine }) => (labelSameLine ? 15 : 0)}px;
  width: ${({ labelSameLine }) => (labelSameLine ? '65%' : '100%')};
  justify-content: space-between;
  align-items: center;

  /* width: 100%; */
`;

export const Container = styled.View<ContainerProps>`
  width: 93%;
  flex-direction: ${({ labelSameLine }) => (labelSameLine ? 'row' : 'column')};
  align-items: ${({ labelSameLine }) =>
    labelSameLine ? 'center' : 'flex-start'};
  justify-content: center;
`;

export const Input = styled.TextInput.attrs<TextInputProps>(
  ({ customFontSize, theme }) => ({
    fontSize: customFontSize,
    placeholderTextColor: theme.Colors.TEXT_GRAY,
  }),
)<TextInputProps>`
  width: ${({ iconRight }) => (iconRight ? 90 : 100)}%;
  /* font-size: 12px; */
  color: ${({ theme }) => theme.Colors.TEXT_GRAY};
  margin-bottom: ${vs(10)}px;
  margin-left: 10px;
`;

export const ErrorMessage = styled(Text)`
  color: ${({ theme }) => theme.Colors.ERROR};

  padding-left: 20px;
  /* background: yellow; */
  width: 100%;
`;

export const IconInput = styled(Icon).attrs<IconInputProps>(
  ({ theme, name, iconType }) => ({
    name,
    size: 24,
    type: iconType,
    color: theme.Colors.MEDIUM_GRAY,
  }),
)<IconInputProps>``;
