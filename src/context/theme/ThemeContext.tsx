import { createContext } from 'react';
import { ThemeContextOptions } from './types';

export const ThemeContext = createContext<ThemeContextOptions>({
  theme: {},
  setTheme: () => {},
});
