import gql from 'graphql-tag';

export interface GetVolumeDailyData {
  pair: {
    dayData: { date: number; volumeUSD: string; }[]
  }
}

export interface GetVolumeDailyVars {
  pairId: string;
  amount: number;
}

export const GetVolumeDaily = gql`
  query GetLiquidityDaily($pairId: ID!, $amount: Int!) {
    pair(id: $pairId) {
      dayData(orderBy: date, orderDirection: desc, first: $amount) {
        date
        volumeUSD
      }
    }
  }
`
