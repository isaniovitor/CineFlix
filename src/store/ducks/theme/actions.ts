import { action } from 'typesafe-actions';

import type { ToogleThemeProps } from './types';
import { ThemeTypes } from './types';

export const toogleTheme = (): ToogleThemeProps =>
  action(ThemeTypes.THEME_TOGGLE);
