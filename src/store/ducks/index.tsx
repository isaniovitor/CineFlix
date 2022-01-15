import { combineReducers } from 'redux';

import film from './film';
import font from './font';
import listCategoryFilms from './listCategoryFilms';
import theme from './theme';
import user from './user';

export default combineReducers({ theme, font, user, film, listCategoryFilms });
