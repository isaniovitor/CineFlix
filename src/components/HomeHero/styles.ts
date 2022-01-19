import styled from 'styled-components/native';

import Icon from '~/components/Icon';

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
