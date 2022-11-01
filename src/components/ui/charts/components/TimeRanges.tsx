import { useThemeContext } from '@/context/theme';
import { Theme, TimeRange } from '@/typings/ui';
import { $for_each } from '@/utils/template';
import styled from '@emotion/styled';
import Color from 'color';
import { FC, useMemo } from 'react';

interface RangeRecord {
  label: string;
  active: boolean;
}

export interface TimeRangesProps {
  active: TimeRange;
  whitelistedRanges?: TimeRange[];
  onChange: (range: TimeRange) => void;
}

export const TimeRanges: FC<TimeRangesProps> = ({ active, whitelistedRanges = [], onChange }) => {
  const { theme } = useThemeContext();

  const ranges = useMemo<Record<TimeRange, RangeRecord>>(() => {
    return {
      '1W': {
        label: '1W',
        active: active === '1W',
      },
      '1M': {
        label: '1M',
        active: active === '1M',
      },
      all: {
        label: 'All',
        active: active === 'all',
      },
    };
  }, [active]);

  const visibleRanges = useMemo(() => {
    return Object.keys(ranges)
      .filter((rangeKey) => {
        return !whitelistedRanges.length || whitelistedRanges.includes(rangeKey as TimeRange);
      })
      .map((rangeKey) => ({ ...ranges[rangeKey as TimeRange], key: rangeKey as TimeRange }));
  }, [ranges, whitelistedRanges]);

  function handleRangeClick(rangeKey: TimeRange) {
    const rangeRecord = ranges[rangeKey];
    if (rangeRecord.active) return;
    onChange(rangeKey);
  }

  return (
    <WrapperStyled itemsAmount={visibleRanges.length}>
      {$for_each(visibleRanges, (range, rangeIdx) => (
        <RangeButton
          key={`chart-range__${rangeIdx}`}
          isActive={range.active}
          theme={theme}
          onClick={() => handleRangeClick(range.key)}
        >
          {range.label}
        </RangeButton>
      ))}
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div<{
  itemsAmount: number;
}>`
  border: 1px solid var(--ui-palette-border-main);
  border-radius: var(--ui-size-borderRadius-main);
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(${({ itemsAmount }) => itemsAmount}, minmax(55px, 1fr));
  grid-gap: 6px;
  padding: 4px;
`;

const RangeButton = styled.button<{
  isActive: boolean;
  theme: Theme;
}>`
  font-family: var(--ui-typography-fontFamily);
  font-size: var(--ui-typography-fontSize);
  font-weight: var(--ui-typography-fontWeightRegular);
  color: var(--ui-palette-text-secondary);
  box-sizing: border-box;
  padding: 0 6px;
  height: 32px;
  border-radius: 10px;
  transition: 0.2s all;
  background: transparent;
  outline: none;
  user-select: none;
  cursor: pointer;
  border: none;

  ${({ isActive, theme }) =>
    isActive &&
    `
    color: var(--ui-palette-primary-main);
    font-weight: var(--ui-typography-fontWeightMedium);
    background: ${new Color(theme.palette.primary.main).fade(0.8).hexa()};
    pointer-events: none;
  `}

  &:not([disabled]) {
    &:hover, &:focus {
      color: var(--ui-palette-primary-main);
    }

    &:active {
      font-weight: var(--ui-typography-fontWeightMedium);
    }
  }

  &[disabled] {
    color: var(--ui-palette-text-secondary);
    ${({ isActive, theme }) => isActive && `${new Color(theme.palette.primary.main).fade(0.85).hexa()};`}
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
