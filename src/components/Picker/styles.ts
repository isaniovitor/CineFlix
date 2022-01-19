import styled from 'styled-components/native';

import Text from '../Text';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

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
  align-items: center;
  justify-content: center;

  width: 100%;
  padding: 20px;

  border-radius: 5px;
  border: 1px solid black;
`;

export const TextButton = styled(Text).attrs(({ theme }) => ({
  fontSize: 16,
}))``;

export const containerModal = {
  height: 500,
  margin: 40,
  borderRadius: 6,
};
