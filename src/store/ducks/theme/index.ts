import type { Reducer } from 'redux';

import { LIGHT, DARK } from '~/constants/theme';

import type { ThemeState } from './types';
import { ThemeTypes } from './types';

const INITIAL_STATE: ThemeState = {
  theme: LIGHT,
};

const reducer: Reducer<ThemeState> = (state = INITIAL_STATE, { type }) => {
  const { theme } = state;
  switch (type) {
    case ThemeTypes.THEME_TOGGLE:
      return {
        theme: theme === LIGHT ? DARK : LIGHT,
      };
    default:
      return state;
  }
};

export default reducer;
