import styled from 'styled-components/native';

import Icon from '~/components/Icon';
import Text from '~/components/Text';

export const Container = styled.View`
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  border: none;
  border-radius: 27px;
  border-color: ${({ theme }) => theme.Colors.BORDER_INPUT};
  border-bottom-width: 1px;
`;

export const ShowListConteiner = styled.View`
  /* justify-content: space-between; */
  flex-direction: column;
  flex-wrap: wrap;
  padding-top: 15px;

  /* align-items: center; */

  /* width: 100%;

  justify-content: center;
  align-items: flex-start;
  border: none;
  border-color: ${({ theme }) => theme.Colors.WHITE};
  border-bottom-width: 1px; */
`;

export const Label = styled(Text).attrs(({ theme }) => ({
  fontSize: 24,
}))`
  /* font-size: 24px; */
  color: ${({ theme }) => theme.Colors.SECONDARY_LIGHT_GRAY};
`;

export const Title = styled(Text).attrs(({ theme }) => ({
  fontSize: 16,
}))`
  /* padding-top: 10px; */
  color: ${({ theme }) => theme.Colors.GRAY};
`;

export const PlaceholderText = styled(Text).attrs(({ theme }) => ({
  fontSize: 12,
}))`
  padding: 10px 0;

  /* font-size: 12px; */
  color: ${({ theme }) => theme.Colors.TEXT_GRAY};
`;

export const Touchable = styled.TouchableOpacity`
  /* flex: 1; */

  width: 100%;
  padding: 0 40px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* background: yellow; */
  /* border-radius: 30px; */
`;

export const ContainerPicker = styled.View`
  padding-top: 10px;
  /* padding: 20px 0px; */
  width: 100%;
  /* background-color: #eeee; */
`;

export const TitleItem = styled(Text).attrs(({ theme }) => ({
  fontSize: 14,
}))`
  /* font-size: 14px; */
  /* padding: 10px; */
  margin-bottom: 10px;
  /* background-color: white; */
  color: ${({ theme }) => theme.Colors.TEXT_GRAY};
`;

export const ContainerList = styled.View`
  padding: 5px 0;
  /* justify-content: flex-start;
  align-items: flex-start; */
`;

export const ContainerModal = styled.TouchableOpacity`
  flex: 1;
`;

export const IconPicker = styled(Icon)`
  /* color: ; */
`;
