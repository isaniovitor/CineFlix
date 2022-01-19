import styled from 'styled-components/native';

import Icon from '~/components/Icon';
import Text from '~/components/Text';

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.Colors.BACKGROUND_WHITE};
`;

export const FilterIcon = styled(Icon).attrs(({ theme }) => ({
  type: 'ionicons',
  name: 'filter',
  color: theme.Colors.FILTER_BUTTON,
  size: 30,
}))``;

export const FilterConteiner = styled.TouchableOpacity`
  padding-top: 10px;
  width: 100%;
  justify-content: flex-end;
  align-items: flex-end;
`;

// renderCategory
export const CategoryName = styled(Text).attrs(({ theme }) => ({
  fontSize: 20,
}))`
  font-weight: bold;
  color: ${({ theme }) => theme.Colors.BLACK_TO_WHITE_TEXT};
`;

// renderFilm
export const FilmContainer = styled.View`
  background: gray;
  justify-content: center;

  margin: 5px;

  flex-direction: row;
`;

export const ImageFilm = styled.Image`
  width: 100px;
  height: 150px;
`;

export const ResumeContainer = styled.View`
  flex: 1;

  justify-content: flex-start;
  align-items: flex-start;

  padding: 20px 10px;
`;

export const FilmName = styled.Text`
  font-size: 20px;
`;

export const FilmResume = styled.Text``;
