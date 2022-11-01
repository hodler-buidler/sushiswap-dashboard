import { GetLiquidityDaily, GetLiquidityDailyData, GetLiquidityDailyVars } from '@/api/graphql/sushi-exchange';
import { UiAreaChart, UiSkeleton, UiText } from '@/components/ui';
import { DEFAULT_DECIMALS } from '@/constants/app';
import { TimeRange } from '@/typings/ui';
import { cutDecimals, formatNumber } from '@/utils/format';
import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface LiquidityChartProps {
  pairId: string;
}

export const LiquidityChart: FC<LiquidityChartProps> = ({ pairId }) => {
  const { t } = useTranslation();
  const [chartTimeRange, setChartTimeRange] = useState<TimeRange>('1M');

  const amountRecordsToFetch = useMemo(() => {
    if (chartTimeRange === '1W') return 7;
    if (chartTimeRange === '1M') return 31;
    return 365;
  }, [chartTimeRange])

  const {
    loading,
    data: chartDataResponse = null,
  } = useQuery<GetLiquidityDailyData, GetLiquidityDailyVars>(GetLiquidityDaily, {
    variables: { pairId, amount: amountRecordsToFetch },
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-first',
  });

  const data = useMemo<[number, number][]>(() => {
    if (!chartDataResponse) return [];
    return chartDataResponse.pair.dayData.map((record) => {
      return [record.date * 1000, Number(cutDecimals(record.reserveUSD, DEFAULT_DECIMALS))];
    }).reverse() as [number, number][];
  }, [chartDataResponse]);

  const displayedLiquidityUSD = useMemo(() => data[data.length - 1]?.[1] || 0, [data]);
  const displayedDate = useMemo(() => {
    const lastRecordedDate = data[data.length - 1]?.[0] || Date.now();
    return dayjs(lastRecordedDate).format('MMM DD');
  }, [data]);

  return (
    <UiAreaChart
      data={data}
      manualRange={chartTimeRange}
      rangesMode="manual"
      onRangeChange={(range) => setChartTimeRange(range)}
      loading={loading}
      color="#14A887"
      tooltipLabel={t('Liquidity')}
      tooltipValue={(v) => `${formatNumber(v, DEFAULT_DECIMALS)}$`}
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
              <UiText variant="h5">{t('Liquidity')}</UiText>
              <UiText paletteColor="text-secondary">{displayedDate}</UiText>
            </>
          )}
        </HeaderStyled>
        <div>
          {loading
            ? <UiSkeleton width="145px" height="18px" borderRadius="4px" />
            : <UiText variant="h3">${formatNumber(displayedLiquidityUSD, DEFAULT_DECIMALS)}</UiText>
          }
        </div>
      </ContentStyled>
    </UiAreaChart>
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
