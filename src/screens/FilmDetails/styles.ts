import styled from 'styled-components/native';

import Icon from '~/components/Icon';
import Text from '~/components/Text';

export const Container = styled.View`
  flex: 1;
  justify-content: center;

  padding: 20px;
  background: ${({ theme }) => theme.Colors.BACKGROUND_WHITE};
`;

// hero
export const Hero = styled.View`
  background: yellow;
  flex: 0.4;
`;

export const PosterFilm = styled.Image`
  width: 100%;
  height: 200px;
`;

// descrition
export const Description = styled.View`
  flex: 0.4;
`;

export const FilmName = styled(Text).attrs(({ theme }) => ({
  fontSize: 25,
}))`
  padding: 10px 0px 5px 0;
  font-weight: bold;
  color: ${({ theme }) => theme.Colors.BLACK_TO_WHITE_TEXT};
`;

export const NumbersConteiner = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const ItemNumbers = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const TextNumbers = styled(Text).attrs(({ theme }) => ({
  fontSize: 14,
}))`
  padding-left: 3px;
  color: ${({ theme }) => theme.Colors.BLACK_TO_WHITE_TEXT};
`;

export const StarIcon = styled(Icon).attrs(({ theme }) => ({
  type: 'ionicons',
  name: 'star',
  color: theme.Colors.BLACK_TO_WHITE_TEXT,
  size: 15,
}))``;

export const CalendarIcon = styled(Icon).attrs(({ theme }) => ({
  type: 'ionicons',
  name: 'calendar',
  color: theme.Colors.BLACK_TO_WHITE_TEXT,
  size: 15,
}))``;

export const PersonIcon = styled(Icon).attrs(({ theme }) => ({
  type: 'ionicons',
  name: 'person',
  color: theme.Colors.BLACK_TO_WHITE_TEXT,
  size: 15,
}))``;

export const overview = styled(Text).attrs(({ theme }) => ({
  fontSize: 14,
}))`
  text-align: justify;
  padding: 10px 0;
  color: ${({ theme }) => theme.Colors.BLACK_TO_WHITE_TEXT};
`;

// recomedation / similars
export const Recommendations = styled.View`
  flex: 0.2;
  justify-content: flex-end;
`;
