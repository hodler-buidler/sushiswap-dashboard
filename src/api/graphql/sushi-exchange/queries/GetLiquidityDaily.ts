import gql from 'graphql-tag';

export interface GetLiquidityDailyData {
  pair: {
    dayData: { date: number; reserveUSD: string; }[]
  }
}

export interface GetLiquidityDailyVars {
  pairId: string;
  amount: number;
}

export const GetLiquidityDaily = gql`
  query GetLiquidityDaily($pairId: ID!, $amount: Int!) {
    pair(id: $pairId) {
      dayData(orderBy: date, orderDirection: desc, first: $amount) {
        date
        reserveUSD
      }
    }
  }
`
