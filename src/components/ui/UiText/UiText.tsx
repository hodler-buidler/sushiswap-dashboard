import { Customizable, TextAlignment, TextVariant } from '@/typings/ui';
import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';

export interface UiTextProps extends Customizable {
  children: ReactNode;
  variant?: TextVariant;
  paletteColor?: string;
  color?: string;
  align?: TextAlignment;
  noselect?: boolean;
  uppercase?: boolean;
}

export const UiText: FC<UiTextProps> = ({
  children,
  variant = 'base',
  paletteColor = 'text-primary',
  color = '',
  align,
  noselect = false,
  uppercase = false,
  className = '',
  style = {},
}) => {
  return (
    <TextStyled
      variant={variant}
      color={color || `var(--ui-palette-${paletteColor})`}
      align={align}
      noselect={noselect}
      uppercase={uppercase}
      className={className}
      style={{ ...style }}
    >
      {children}
    </TextStyled>
  );
};

const TextStyled = styled.span<{
  variant: TextVariant;
  color: string;
  align?: TextAlignment;
  noselect: boolean;
  uppercase: boolean;
}>`
  ${({ variant, color, align, noselect, uppercase }) => `
    font-family: var(--ui-typography-${variant}-fontFamily);
    font-size: var(--ui-typography-${variant}-fontSize);
    font-weight: var(--ui-typography-${variant}-fontWeight);
    line-height: var(--ui-typography-${variant}-lineHeight);
    color: ${color};

    ${
  align
    ? `
      text-align: ${align};
      display: block;
    `
    : ''
}

    ${noselect ? 'user-select: none;' : ''}
    ${uppercase ? 'text-transform: uppercase;' : ''}
  `}
`;
