import { action } from 'typesafe-actions';

import type {
  DecrementFontSizeProps,
  IncrementFontSizeProps,
  RecoveryFontSizeProps,
} from './types';
import { FontTypes } from './types';

export const incrementFontSize = (): IncrementFontSizeProps =>
  action(FontTypes.FONT_SIZE_INCREMENT);

export const decrementFontSize = (): DecrementFontSizeProps =>
  action(FontTypes.FONT_SIZE_DECREMENT);

export const recoveryFontSize = (): RecoveryFontSizeProps =>
  action(FontTypes.FONT_SIZE_RECOVERY);
