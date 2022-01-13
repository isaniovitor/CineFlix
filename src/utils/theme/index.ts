import { LIGHT } from '~/constants/theme';
import themeProvider from '~/themes';

export const createTheme = (theme: string) =>
  theme === LIGHT ? themeProvider.light : themeProvider.dark;
