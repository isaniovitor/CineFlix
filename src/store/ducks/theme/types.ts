import type { Action } from 'redux';

export enum ThemeTypes {
  THEME_TOGGLE = '@theme/THEME_TOGGLE',
}

export interface ThemeState {
  theme: string;
}

export interface ToogleThemeProps extends Action {
  type: ThemeTypes.THEME_TOGGLE;
}
