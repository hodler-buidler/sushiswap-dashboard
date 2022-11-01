import { GetVolumeDaily, GetVolumeDailyData, GetVolumeDailyVars } from '@/api/graphql/sushi-exchange';
import { UiColumnChart, UiSkeleton, UiText } from '@/components/ui';
import { DEFAULT_DECIMALS } from '@/constants/app';
import { TimeRange } from '@/typings/ui';
import { cutDecimals, formatNumber } from '@/utils/format';
import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface VolumeChartProps {
  pairId: string;
}

export const VolumeChart: FC<VolumeChartProps> = ({ pairId }) => {
  const { t } = useTranslation();
  const [chartTimeRange, setChartTimeRange] = useState<TimeRange>('1M');

  const amountRecordsToFetch = useMemo(() => {
    if (chartTimeRange === '1W') return 14;
    if (chartTimeRange === '1M') return 40;
    return 100;
  }, [chartTimeRange])

  const {
    loading,
    data: chartDataResponse = null,
  } = useQuery<GetVolumeDailyData, GetVolumeDailyVars>(GetVolumeDaily, {
    variables: { pairId, amount: amountRecordsToFetch },
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-first',
  });

  const data = useMemo<{x: number, y: number}[]>(() => {
    if (!chartDataResponse) return [];
    return chartDataResponse.pair.dayData.map((record) => {
      return {
        x: record.date * 1000,
        y: Number(cutDecimals(record.volumeUSD, DEFAULT_DECIMALS))
      };
    }).reverse();
  }, [chartDataResponse]);

  const [hoveredVolume, setHoveredVolume] = useState<null | number>(null);
  const displayedVolume = useMemo(() => {
    const lastRecordedVolume = data[data.length - 1]?.y || 0;
    return hoveredVolume === null ? lastRecordedVolume : hoveredVolume;
  }, [hoveredVolume, data]);

  const [hoveredDate, setHoveredDate] = useState<null | number>(null);
  const displayedDate = useMemo(() => {
    const lastRecordedDate = data[data.length - 1]?.x || Date.now();
    const finalDate = hoveredDate === null ? lastRecordedDate : hoveredDate;
    return dayjs(finalDate).format('MMM DD');
  }, [hoveredDate, data]);

  function handleBarMouseEnter(record: { x: number, y: number }) {
    setHoveredVolume(record.y);
    setHoveredDate(record.x);
  }

  function handleBarMouseLeave() {
    setHoveredVolume(null);
    setHoveredDate(null);
  }

  return (
    <UiColumnChart
      data={data}
      manualRange={chartTimeRange}
      rangesMode="combined"
      onRangeChange={(range) => setChartTimeRange(range)}
      loading={loading}
      color="#F643CF"
      alternativeColor="rgba(246, 67, 207, 0.6)"
      gradientColor="rgba(235, 122, 74, 0.3)"
      onBarMouseEnter={handleBarMouseEnter}
      onBarMouseLeave={handleBarMouseLeave}
    >
      <ContentStyled>
        <HeaderStyled>
          {loading ? (
            <>
              <UiSkeleton width="80px" height="14px" borderRadius="4px" />
              <UiSkeleton width="60px" height="14px" borderRadius="4px" />
            </>
          ) : (
            <>
              <UiText variant="h5">{t('Volume')}</UiText>
              <UiText paletteColor="text-secondary">{displayedDate}</UiText>
            </>
          )}
        </HeaderStyled>
        <div>
          {loading
            ? <UiSkeleton width="145px" height="18px" borderRadius="4px" />
            : <UiText variant="h3">${formatNumber(displayedVolume, DEFAULT_DECIMALS)}</UiText>
          }
        </div>
      </ContentStyled>
    </UiColumnChart>
  );
}

const ContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const HeaderStyled = styled.div`
  display: flex;
  gap: 6px;
`;
