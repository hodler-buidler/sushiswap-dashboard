import { TimeRange } from '@/typings/ui';
import ApexCharts from 'apexcharts';

export function changeRangeZoom(chartId: string, timeRange: TimeRange, firstTimestamp: number, lastTimestamp: number) {
  const oneMonthMS = 2629743833;
  const oneWeekMS = 604800000;

  function getMinTimestamp(msFromCurrent: number) {
    const minTimestamp = lastTimestamp - msFromCurrent;
    return minTimestamp < firstTimestamp ? firstTimestamp : minTimestamp;
  }

  switch (timeRange) {
    case 'all': {
      ApexCharts.exec(chartId, 'zoomX', new Date(firstTimestamp).getTime(), new Date(lastTimestamp).getTime());
      break;
    }
    case '1M': {
      ApexCharts.exec(
        chartId,
        'zoomX',
        new Date(getMinTimestamp(oneMonthMS)).getTime(),
        new Date(lastTimestamp).getTime(),
      );
      break;
    }
    case '1W': {
      ApexCharts.exec(
        chartId,
        'zoomX',
        new Date(getMinTimestamp(oneWeekMS)).getTime(),
        new Date(lastTimestamp).getTime(),
      );
      break;
    }
  }
}
