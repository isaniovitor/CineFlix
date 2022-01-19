import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

import Icon from '~/components/Icon';
import Text from '~/components/Text';

interface Props {
  headerMenu: boolean;
}

export const Container = styled.View<Props>`
  height: ${({ headerMenu }) => (headerMenu ? 120 : 60)}px;
  width: 100%;

  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StatusBar = styled.StatusBar.attrs(({ theme }) => ({
  backgroundColor: theme.Colors.BACKGROUND_RED,
}))``;

export const ButtonLeft = styled.TouchableOpacity`
  padding-left: 15px;
  flex: 0.15;
  color: ${({ theme }) => theme.Colors.WHITE};
`;

export const ButtonHeaderUp = styled.TouchableOpacity`
  color: ${({ theme }) => theme.Colors.WHITE};
`;

export const IconColor = styled(Icon).attrs(({ theme }) => ({
  name: 'invert-colors',
  size: 18,
}))`
  color: ${({ theme }) => theme.Colors.WHITE};
`;

// up header
export const AceContainer = styled.View`
  width: 100%;
  padding: 0 15px;

  flex: 1;
  flex-direction: row;
  align-items: center;

  background: ${({ theme }) => theme.Colors.BACKGROUND_RED};
  border-color: ${({ theme }) => theme.Colors.WHITE};
  border-bottom-width: 1px;
`;

export const AceContainerLeft = styled.View`
  flex: 0.6;
  flex-direction: row;
  justify-content: flex-start;
`;

export const AceContainerRight = styled.View`
  flex: 0.4;
  flex-direction: row;
  justify-content: space-between;
`;

export const IconChangeTheme = styled(Icon).attrs(({ theme }) => ({
  type: 'ionicons',
  name: 'ios-sunny-outline',
  color: theme.Colors.BACKGROUND_BUTTON_WHITE,
  size: 30,
}))``;

export const SizeText = styled.Text`
  font-size: 20px;
  font-weight: bold
  color: ${({ theme }) => theme.Colors.BACKGROUND_BUTTON_WHITE};
`;

// down header
export const HeaderContainer = styled.View`
  width: 100%;

  flex: 1;
  flex-direction: row;
  align-items: center;
  background: ${({ theme }) => theme.Colors.BACKGROUND_RED};
`;

export const IconBack = styled(Icon).attrs(({ theme }) => ({
  type: 'ionicons',
  name: 'arrow-back',
  color: theme.Colors.BACKGROUND_BUTTON_WHITE,
  size: 30,
}))``;

export const IconProfile = styled(Icon).attrs(({ theme }) => ({
  type: 'ionicons',
  name: 'menu',
  color: theme.Colors.BACKGROUND_BUTTON_WHITE,
  size: 30,
}))`
  color: ${({ theme }) => theme.Colors.WHITE};
`;

export const ImageProfile = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 65px;
`;

export const IconSaveData = styled(Icon).attrs(({ theme }) => ({
  type: 'ionicons',
  name: 'save',
  color: theme.Colors.BACKGROUND_BUTTON_WHITE,
  size: 30,
}))`
  margin-left: 100px;
`;

export const Title = styled(Text).attrs(({ theme }) => ({
  fontSize: 24,
}))`
  flex: 0.8;

  text-align: center;
  color: ${({ theme }) => theme.Colors.WHITE};
`;

export const InputContainer = styled.View`
  width: 100%;

  flex: 0.85;
`;
