import { useThemeContext } from '@/context/theme';
import i18n from '@/i18n';
import { TimeRange } from '@/typings/ui';
import { randomInt } from '@/utils/math';
import { $if, $if_else } from '@/utils/template';
import styled from '@emotion/styled';
import { ApexOptions } from 'apexcharts';
import Color from 'color';
import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import Chart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';
import { UiSpinner } from '../../UiSpinner/UiSpinner';
import { UiText } from '../../UiText/UiText';
import { TimeRanges } from '../components';
import { changeRangeZoom } from '../utils';
import { useChartOptions } from './hooks';

export interface UiAreaChartProps {
  data: [number, number][];
  children?: ReactNode;
  loading?: boolean;
  loadingContent?: ReactNode;
  emptyContent?: ReactNode;

  minHeight?: string;
  chartHeight?: string;
  background?: string;
  color?: string;

  rangesMode?: 'manual' | 'auto';
  disableRanges?: boolean;
  whitelistedRanges?: TimeRange[];
  manualRange?: TimeRange;
  onRangeChange?: (range: TimeRange) => void;

  animated?: boolean;
  tooltipLabel?: string;
  tooltipValue?: (value: number) => string;

  className?: string;
  style?: Record<string, string | number>;
}

export const UiAreaChart: FC<UiAreaChartProps> = ({
  data = [],
  children,
  loading = false,
  loadingContent,
  emptyContent,

  minHeight = '260px',
  chartHeight = '200px',
  background,
  color,

  rangesMode = 'auto',
  disableRanges = false,
  whitelistedRanges = [],
  manualRange = 'all',
  onRangeChange = () => {},

  animated = false,
  tooltipLabel = `${i18n.t('Value')}:`,
  tooltipValue = (value) => `${value}`,

  className = '',
  style = {},
}) => {
  const { theme: { palette } } = useThemeContext();
  const { t } = useTranslation();

  const [currentRangeInAutoMode, setCurrentRangeInAutoMode] = useState<TimeRange>(whitelistedRanges[0] || '1M');
  const currentRange = useMemo(
    () => (rangesMode === 'auto' ? currentRangeInAutoMode : manualRange),
    [rangesMode, currentRangeInAutoMode, manualRange],
  );

  const chartId = useMemo(() => `area-chart-${randomInt()}`, []);
  const chartBackground = background || palette.bg.default;
  const chartColor = color || palette.primary.main;
  const chartOptions = useChartOptions({
    chartId,
    chartColor,
    animated,
    tooltipLabel,
    tooltipValue,
    currentRange,
  });
  const chartData = useMemo<ApexOptions['series']>(() => [{ data }], [data]);
  const isChartEmpty = !data.length && !loading;

  const loadingMessageBgColor = new Color(chartBackground).fade(0.6).hexa();

  useEffect(() => {
    if (rangesMode === 'auto' && data.length) {
      changeRangeZoom(chartId, currentRange, data[0][0], data[data.length - 1][0]);
    }
  }, [currentRange, data]);

  function handleRangeChange(rangeKey: TimeRange) {
    if (rangesMode === 'auto') setCurrentRangeInAutoMode(rangeKey);
    else onRangeChange(rangeKey);
  }

  return (
    <WrapperStyled background={chartBackground} minHeight={minHeight} className={className} style={{ ...style }}>
      {$if(
        loading,
        <MessageStyled background={loadingMessageBgColor} style={{ backdropFilter: 'blur(4px)' }}>
          {$if_else(
            loadingContent,
            loadingContent,
            <div>
              <UiSpinner size="64px" />
            </div>,
          )}
        </MessageStyled>,
      )}

      {$if(
        isChartEmpty,
        <MessageStyled>
          {$if_else(
            emptyContent,
            emptyContent,
            <UiText
              align="center"
              variant="h3"
              noselect
              paletteColor="text-secondary"
            >
              {t('This chart is empty')}
              <br />
              {t('Data is not available')}
            </UiText>,
          )}
        </MessageStyled>,
      )}

      <HeaderStyled>
        <div>{children}</div>
        {$if(
          !disableRanges,
          <TimeRanges active={currentRange} whitelistedRanges={whitelistedRanges} onChange={handleRangeChange} />,
        )}
      </HeaderStyled>
      <ChartStyled>
        <Chart options={chartOptions} series={chartData} type="area" height={chartHeight} />
      </ChartStyled>
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div<{
  background: string;
  minHeight: string;
}>`
  --ui-area-chart-border-radius: var(--ui-size-borderRadius-main);
  --ui-area-chart-bg: ${({ background }) => background};

  background: var(--ui-area-chart-bg);
  border-radius: var(--ui-area-chart-border-radius);
  border: 1px solid var(--ui-palette-border-main);
  padding-bottom: 4px;
  padding-top: 16px;
  box-sizing: border-box;
  position: relative;
  min-height: ${({ minHeight }) => minHeight};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const HeaderStyled = styled.div`
  border-top-right-radius: var(--ui-area-chart-border-radius);
  border-top-left-radius: var(--ui-area-chart-border-radius);
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 12px 16px;
  padding-right: 8px;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

const ChartStyled = styled.div`
  .apexcharts-xcrosshairs,
  .apexcharts-ycrosshairs {
    display: none;
  }

  .apexcharts-xaxis-label {
    fill: var(--ui-palette-grey-100);
    font-weight: var(--ui-typography-fontWeightRegular);
    font-family: var(--ui-typography-fontFamily);
    opacity: 0.47;
    text-transform: uppercase;
    letter-spacing: -0.02em;
    font-size: 11px;
  }

  .apexcharts-tooltip {
    background: var(--ui-area-chart-bg) !important;
    color: var(--ui-palette-text-primary);
    border: 1px solid var(--ui-palette-grey-100) !important;
  }

  .apexcharts-tooltip-title {
    background: transparent !important;
    margin-bottom: 0;
    padding: 2px 4px;
    text-align: center;
    border-bottom: 1px solid var(--ui-palette-grey-100) !important;
  }

  .apexcharts-tooltip-text {
    font-size: var(--ui-typography-fontSize) !important;
  }

  .apexcharts-tooltip-y-group {
    padding: 0;
  }

  .apexcharts-tooltip-series-group.apexcharts-active,
  .apexcharts-tooltip-series-group:last-child {
    padding-bottom: 0;
  }
`;

const MessageStyled = styled.div<{
  background?: string;
}>`
  z-index: 2;
  background: ${({ background }) => (background || 'var(--ui-area-chart-bg)')};
  border-radius: var(--ui-area-chart-border-radius);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
