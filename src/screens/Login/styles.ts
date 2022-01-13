import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

import Icon from '~/components/Icon';
import Text from '~/components/Text';

// Conteiner
export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.Colors.BACKGROUND_WHITE};
`;

// Image section
export const ImageContainer = styled.View`
  flex: 0.4;
  justify-content: center;
  align-items: center;

  background: orange;
  border-bottom-left-radius: 100px;
  background: ${({ theme }) => theme.Colors.BACKGROUND_RED};

  width: 100%;
`;

export const BookIcon = styled(Icon).attrs(({ theme }) => ({
  type: 'ionicons',
  name: 'film',
  color: theme.Colors.WHITE,
  size: 150,
}))`
  color: ${({ theme }) => theme.Colors.WHITE};
`;

// Inputs section
export const InputsContainer = styled.View`
  flex: 0.3;
  justify-content: space-evenly;
  align-items: center;

  width: 90%;
`;

export const text = styled(Text).attrs(({ theme }) => ({
  fontSize: 12,
}))`
  text-align: right;
  color: ${({ theme }) => theme.Colors.GRAY};

  width: 100%;
`;

// Login section
export const LoginContainer = styled.View`
  flex: 0.3;
  justify-content: center;
  align-items: center;

  width: 90%;
`;

export const CreateAccountContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding-top: 10px;
`;

export const CreateAccount = styled(Text).attrs(({ theme }) => ({
  fontSize: 16,
}))`
  color: ${({ theme }) => theme.Colors.GRAY};
`;

export const OrengeText = styled(Text).attrs(({ theme }) => ({
  fontSize: 16,
}))`
  color: ${({ theme }) => theme.Colors.BACKGROUND_RED_CLICKABLE};
`;
