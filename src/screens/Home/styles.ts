import styled from 'styled-components/native';

import Icon from '~/components/Icon';
import Text from '~/components/Text';

// renderCategory
export const CategoryName = styled(Text).attrs(({ theme }) => ({
  fontSize: 20,
}))`
  font-weight: bold;
  color: ${({ theme }) => theme.Colors.BLACK};
`;

export const ImageFilme = styled.Image`
  width: 100px;
  height: 150px;
`;

// renderFilm
