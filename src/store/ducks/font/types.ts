import type { Action } from 'redux';

export enum FontTypes {
  FONT_SIZE_INCREMENT = '@font/FONT_SIZE_INCREMENT',
  FONT_SIZE_DECREMENT = '@font/FONT_SIZE_DECREMENT',
  FONT_SIZE_RECOVERY = '@font/FONT_SIZE_RECOVERY',
}

export interface FontState {
  delta: number;
}

export interface IncrementFontSizeProps extends Action {
  type: FontTypes.FONT_SIZE_INCREMENT;
}

export interface DecrementFontSizeProps extends Action {
  type: FontTypes.FONT_SIZE_DECREMENT;
}

export interface RecoveryFontSizeProps extends Action {
  type: FontTypes.FONT_SIZE_RECOVERY;
}
