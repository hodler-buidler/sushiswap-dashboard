import gql from 'graphql-tag';

export interface GetPairVitalsData {
  pair: {
    token0Price: string;
    token1Price: string;
    reserve0: string;
    reserve1: string;
    token0: {
      symbol: string;
    }
    token1: {
      symbol: string;
    }
    liquidityPositionSnapshots: [{
      token0PriceUSD: string;
      token1PriceUSD: string;
    }]
  }
}

export interface GetPairVitalsVars {
  pairId: string;
}

export const GetPairVitals = gql`
  query GetPairVitals($pairId: ID!) {
    pair(id: $pairId) {
      token0Price
      token1Price
      reserve0
      reserve1
      token0 {
        symbol
      }
      token1 {
        symbol
      }
      liquidityPositionSnapshots(first: 1) {
        token0PriceUSD
        token1PriceUSD
      }
    }
  }
`
