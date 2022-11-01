import { Customizable } from '@/typings/ui';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { FC } from 'react';

export interface UiSpinnerProps extends Customizable {
  paletteColor?: string;
  color?: string;
  size?: string;
  speed?: string;
}

export const UiSpinner: FC<UiSpinnerProps> = ({
  paletteColor = 'primary-main',
  color = '',
  size = '16px',
  speed = '1.2s',
  className = '',
  style = {},
}) => {
  return (
    <SpinnerStyled
      paletteColor={paletteColor}
      color={color}
      size={size}
      speed={speed}
      className={className}
      style={{ ...style }}
    />
  );
};

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerStyled = styled.div<{
  paletteColor?: string;
  color?: string;
  size?: string;
  speed?: string;
}>`
  display: inline-block;

  ${({ size }) => `
    width: ${size}; 
    height: ${size};  
  `}

  &:after {
    content: ' ';
    display: block;

    ${({ size }) => `
      width: ${size};
      height: ${size};  
    `}

    border-radius: 50%;
    ${({ paletteColor, color }) => `
      border: 2px solid ${color || `var(--ui-palette-${paletteColor})`};
      border-color: ${color || `var(--ui-palette-${paletteColor})`} transparent ${color || `var(--ui-palette-${paletteColor})`} transparent;
    `}
    animation: ${spin} ${({ speed }) => speed} linear infinite;
  }
`;
