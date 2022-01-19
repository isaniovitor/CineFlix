import styled from 'styled-components/native';

import Icon from '~/components/Icon';
import Text from '~/components/Text';

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
