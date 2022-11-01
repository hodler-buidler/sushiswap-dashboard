import { UiSkeleton, UiText } from '@/components/ui';
import { DEFAULT_DECIMALS } from '@/constants/app';
import { PairVitals } from '@/typings/liquidity-pairs';
import { Customizable } from '@/typings/ui';
import { formatNumber } from '@/utils/format';
import { getTokenIcon } from '@/utils/tokens';
import styled from '@emotion/styled';
import { FC, useMemo } from 'react';

export interface TokenInfoCardProps extends Customizable {
  pair: PairVitals | null;
  targetToken: 0 | 1;
  loading?: boolean;
  amountDecimals?: number;
  priceDecimals?: number;
}

export const TokenInfoCard: FC<TokenInfoCardProps> = ({
  pair,
  targetToken,
  loading = false,
  amountDecimals = 0,
  priceDecimals = 1,
}) => {
  const tokenTicker = useMemo(() => pair?.[`token${targetToken}`]?.symbol || '$COIN', [pair, targetToken]);
  const tokensAmount = useMemo(() => pair?.[`reserve${targetToken}`] || '0', [pair, targetToken]);
  const priceInOppositeToken = useMemo(() => pair?.[`token${targetToken ? 0 : 1}Price`] || '0', [pair, targetToken]);
  const oppositeTokenTicker = useMemo(() => pair?.[`token${targetToken ? 0 : 1}`]?.symbol || '$COIN', [pair, targetToken]);
  const tokenPriceUSD = useMemo(() => pair?.liquidityPositionSnapshots[0]?.[`token${targetToken}PriceUSD`] || '0', [pair, targetToken]);

  const icon = useMemo(() => getTokenIcon(tokenTicker), [tokenTicker]);

  return (
    <WrapperStyled>
      <AmountRowStyled>
        { loading ? (
          <>
            <UiSkeleton circle width="20px" height="20px" />
            <UiSkeleton width="80px" height="14px" borderRadius="4px" />
            <UiSkeleton width="50px" height="14px" borderRadius="4px" />
          </>
        ) : (
          <>
            <IconContainerStyled>
              <IconStyled src={icon} alt="" />
            </IconContainerStyled>
            <UiText variant="h3">
              {formatNumber(tokensAmount, amountDecimals)}
            </UiText>
            <UiText paletteColor="text-secondary">
              {tokenTicker}
            </UiText>
          </>
        )}
      </AmountRowStyled>
      <PriceRowStyled>
        {loading ? (
          <>
            <UiSkeleton width="140px" height="14px" borderRadius="4px" />
            <UiSkeleton width="80px" height="14px" borderRadius="4px" />
          </>
        ) : (
          <>
            <UiText variant="h5">
              1 {tokenTicker} = {formatNumber(priceInOppositeToken, priceDecimals)} {oppositeTokenTicker}
            </UiText>
            <UiText paletteColor="text-secondary">
              (${formatNumber(tokenPriceUSD, DEFAULT_DECIMALS)})
            </UiText>
          </>
        )}
      </PriceRowStyled>
    </WrapperStyled>
  )
}

const WrapperStyled = styled.div`
  background: var(--ui-palette-background-default);
  border: 1px solid var(--ui-palette-border-main);
  border-radius: var(--ui-size-borderRadius-main);
  padding: 24px 16px;
  box-sizing: border-box;
  min-height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
`;

const AmountRowStyled = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const PriceRowStyled = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 6px;
`;

const IconContainerStyled = styled.div`
  user-select: none;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -2px;
`;

const IconStyled = styled.img`
  max-height: 100%;
  max-width: 100%;
`;
