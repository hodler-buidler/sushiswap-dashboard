import { useThemeContext } from '@/context/theme';
import { Customizable } from '@/typings/ui';
import { getObjectRoutes } from '@/utils/object';
import styled from '@emotion/styled';
import { FC, ReactNode, useEffect } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import './global.scss';

export interface UiAppProps extends Customizable {
  children: ReactNode;
}

export const UiApp: FC<UiAppProps> = ({ children, className = '', style = {} }) => {
  const { theme } = useThemeContext();

  useEffect(() => {
    injectCSSVariables(theme);
  }, [theme]);

  return (
    <WrapperStyled className={className} style={{ ...style }}>
      { children }
    </WrapperStyled>
  )
}

function injectCSSVariables(theme: Record<string, unknown>) {
  const appBody = document.querySelector('html');
  const [variablesNames, variablesValues] = getObjectRoutes(theme, '--ui');

  variablesNames.forEach((name, nameIdx) => {
    appBody!.style.setProperty(name, variablesValues[nameIdx]);
  });
}

const WrapperStyled = styled.div`
  min-height: 100vh;
`;
