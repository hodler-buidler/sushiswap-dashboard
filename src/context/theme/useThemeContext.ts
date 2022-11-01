import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { ThemeContextOptions } from './types';

export function useThemeContext() {
  const context = useContext<ThemeContextOptions>(ThemeContext);
  return context;
}
