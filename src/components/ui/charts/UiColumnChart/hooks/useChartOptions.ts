import { useThemeContext } from '@/context/theme';
import { ApexOptions } from 'apexcharts';
import { useMemo } from 'react';

interface UseChartOptionsParams {
  chartId: string;
  color: string;
  alternativeColor: string;
  gradientColor: string;
  animated: boolean;
  onBarMouseEnter: (record: { x: number, y: number }) => void;
  onBarMouseLeave: (record?: { x: number, y: number }) => void;
}

export function useChartOptions({
  chartId,
  color,
  alternativeColor,
  gradientColor,
  animated,
  onBarMouseEnter,
  onBarMouseLeave,
}: UseChartOptionsParams) {
  const { theme } = useThemeContext();
  const { palette, typography } = theme;

  const options = useMemo<ApexOptions>(
    () => ({
      chart: {
        id: chartId,
        fontFamily: typography.fontFamily,
        parentHeightOffset: 0,
        animations: {
          enabled: animated,
          speed: 500,
        },
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
        events: {
          dataPointMouseEnter: (event, chartContext, config: any) => {
            onBarMouseEnter(config.w.config.series[config.seriesIndex].data[config.dataPointIndex]);
          },
          dataPointMouseLeave: (event, chartContext, config: any) => {
            onBarMouseLeave(config.w.config.series[config.seriesIndex].data[config.dataPointIndex]);
          },
          mouseLeave: () => {
            onBarMouseLeave();
          },
        },
      },
      fill: {
        colors: [(value: { dataPointIndex: number }) => {
          if (value.dataPointIndex % 2 !== 0) return alternativeColor || color;
          return color;
        }],
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'vertical',
          gradientToColors: [gradientColor || color],
          shadeIntensity: 0,
          opacityFrom: 0.9,
          opacityTo: 0.3,
          stops: [0, 100],
        },
      },
      states: {
        active: {
          filter: {
            type: 'none',
          },
        },
      },
      xaxis: {
        type: 'numeric',
        floating: false,
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        show: false,
      },
      plotOptions: {
        bar: {
          borderRadius: 5,
          columnWidth: '100%',
          barHeight: '100%',
        }
      },
      grid: {
        show: false,
        padding: {
          left: 0,
          right: 0,
          bottom: -32,
        },
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        enabled: false,
      },
    }),
    [palette, typography, color, alternativeColor, gradientColor, animated, onBarMouseEnter, onBarMouseLeave],
  );

  return options;
}
