import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

import Icon from '~/components/Icon';
import Text from '~/components/Text';

// Conteiner
export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.Colors.BACKGROUND_RED}; ;
`;

// image section
export const SearchConteiener = styled.View`
  flex: 0.4;
  justify-content: space-evenly;
  align-items: center;
  width: 90%;
`;

export const ImageContainer = styled.View`
  flex: 0.4;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin-bottom: 15px;
  width: 90%;
`;

export const ImageText = styled(Text).attrs(({ theme }) => ({
  fontSize: 12,
}))`
  text-align: center;
  color: ${({ theme }) => theme.Colors.BACKGROUND_BUTTON_WHITE};
`;

export const Image = styled.Image`
  width: 185px;
  height: 185px;
  border-radius: 100px;
`;

export const IconConteiner = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 190px;
  height: 190px;

  border: 1px solid ${({ theme }) => theme.Colors.BACKGROUND_BUTTON_WHITE};
  border-radius: 100px;
`;

export const IconInput = styled(Icon).attrs(({ theme }) => ({
  type: 'ionicons',
  name: 'person',
  size: 100,
  color: theme.Colors.BACKGROUND_BUTTON_WHITE,
}))``;

export const HeroConteiener = styled.View`
  justify-content: center;
  align-items: center;
  flex: .6;

  flex-direction: row
  width: 100%;
`;

export const TextConteiener = styled.View`
  /* justify-content: center;
  align-items: center; */
  flex: 0.5;
  padding-left: 15px;
  width: 100%;
`;

// inputs section
export const InputsContainer = styled.View`
  flex: 0.6;
  justify-content: center;
  align-items: center;

  background: ${({ theme }) => theme.Colors.BACKGROUND_WHITE};
  border-top-left-radius: 50px;

  width: 100%;
`;

export const Inputs = styled.ScrollView`
  flex: 1;
  margin-top: 10px;
  /* justify-content: center;
  align-items: center; */

  width: 90%;
`;

export const ButtonContainer = styled.View`
  padding: 30px 0;
`;
