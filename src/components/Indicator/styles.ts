import styled from 'styled-components/native';

import Text from '../Text';

export const IndContainer = styled.View`
  position: absolute;
  z-index: 100;
  width: 50%;

  border-radius: 6px;
  padding: 10px;
  background: ${({ theme }) => theme.Colors.BACKGROUND_WHITE};

  border: 1px solid ${({ theme }) => theme.Colors.WHITE};
`;

export const Title = styled(Text).attrs(({ theme }) => ({
  fontSize: 20,
}))`
  text-align: center;
  color: ${({ theme }) => theme.Colors.GRAY};
`;
