import { DEFAULT_APP_THEME } from '@/constants/ui';
import { Theme } from '@/typings/ui';
import { FC, PropsWithChildren, useMemo, useState } from 'react';
import { ThemeContext } from './ThemeContext';

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(DEFAULT_APP_THEME);

  const contextValue = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};
