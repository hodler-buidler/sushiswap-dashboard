import { Theme } from '@/typings/ui';

export interface ThemeContextOptions {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
