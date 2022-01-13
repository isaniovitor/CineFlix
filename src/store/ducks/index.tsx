import { combineReducers } from 'redux';

import font from './font';
import theme from './theme';
import user from './user';

export default combineReducers({ theme, font, user });
