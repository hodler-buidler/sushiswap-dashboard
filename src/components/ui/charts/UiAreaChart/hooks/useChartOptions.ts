import { useThemeContext } from '@/context/theme';
import { TimeRange } from '@/typings/ui';
import { ApexOptions } from 'apexcharts';
import { useMemo } from 'react';

interface UseChartOptionsParams {
  chartId: string;
  chartColor: string;
  animated: boolean;
  tooltipLabel: string;
  tooltipValue: (value: number) => string;
  currentRange: TimeRange;
}

export function useChartOptions({
  chartId,
  chartColor,
  animated,
  tooltipLabel,
  tooltipValue,
  currentRange,
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
      },
      colors: [chartColor],
      fill: {
        colors: [chartColor],
        opacity: 0.1,
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'vertical',
          shadeIntensity: 0,
          opacityFrom: 0.4,
          opacityTo: 0.15,
          stops: [0, 100],
        },
      },
      stroke: {
        curve: 'smooth' as const,
        width: 1,
      },
      xaxis: {
        type: 'datetime',
        floating: false,
        labels: {
          style: {
            fontSize: `${typography.fontSize}px`,
            fontFamily: typography.fontFamily,
          },
          datetimeFormatter: getRangeDateLabelFormatting(currentRange),
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
      grid: {
        show: false,
        padding: {
          left: 0,
          right: 0,
          bottom: 0,
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        radius: 4,
        strokeWidth: 10,
        strokeColors: chartColor,
        strokeOpacity: 0.2,
        hover: {
          size: 3,
          sizeOffset: 0,
        },
      },
      tooltip: {
        marker: {
          show: false,
        },
        style: {
          fontSize: '10px',
        },
        x: {
          format: getRangeTooltipFormatting(currentRange),
        },
        y: {
          formatter: tooltipValue,
          title: {
            formatter: () => tooltipLabel,
          },
        },
      },
    }),
    [palette, typography, chartColor, animated, tooltipLabel, tooltipValue, currentRange],
  );

  return options;
}

function getRangeTooltipFormatting(range: TimeRange) {
  let resultFormatting = 'dd MMM yyyy';

  switch (range) {
    case 'all': {
      break;
    }
    case '1M': {
      resultFormatting = 'dd MMM, HH:mm';
      break;
    }
    case '1W': {
      resultFormatting = 'dd MMM, HH:mm';
      break;
    }
  }

  return resultFormatting;
}

function getRangeDateLabelFormatting(range: TimeRange) {
  let resultFormatting = {
    year: 'yyyy',
    month: 'MMM',
    day: 'dd ddd',
    hour: 'HH:mm',
  };

  switch (range) {
    case 'all': {
      break;
    }
    case '1M': {
      resultFormatting = {
        ...resultFormatting,
        year: '',
        month: 'd MMM',
        day: 'd MMM',
      };
      break;
    }
    case '1W': {
      resultFormatting = {
        ...resultFormatting,
        year: '',
        month: 'dd ddd',
        day: 'dd ddd',
        hour: '',
      };
      break;
    }
  }

  return resultFormatting;
}
