import styled from 'styled-components/native';

import Text from '../Text';

export const Container = styled.View`
  flex-direction: row;
  border-radius: 6px;
  padding: 5px;
`;

export const ImageContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.Image`
  width: 50px;
  height: 50px;
`;

export const Button = styled.TouchableOpacity`
  flex: 1;
  padding: 20px;
  align-items: center;
  border-radius: 5px;
`;

export const TextButton = styled(Text).attrs(({ theme }) => ({
  fontSize: 16,
}))``;

export const containerModal = {
  margin: 40,
  borderRadius: 6,
};
