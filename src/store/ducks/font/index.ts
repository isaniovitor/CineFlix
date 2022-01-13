import type { Reducer } from 'redux';

import type { FontState } from './types';
import { FontTypes } from './types';

const INITIAL_STATE: FontState = {
  delta: 0,
};

const reducer: Reducer<FontState> = (state = INITIAL_STATE, { type }) => {
  const { delta } = state;

  switch (type) {
    case FontTypes.FONT_SIZE_INCREMENT:
      return { delta: delta < 4 ? delta + 1 : delta };
    case FontTypes.FONT_SIZE_DECREMENT:
      return { delta: delta > -4 ? delta - 1 : delta };
    case FontTypes.FONT_SIZE_RECOVERY:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default reducer;
