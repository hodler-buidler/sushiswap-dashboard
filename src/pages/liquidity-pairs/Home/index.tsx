import { GetPairVitals, GetPairVitalsData, GetPairVitalsVars } from '@/api/graphql/sushi-exchange';
import { LiquidityChart, TokenInfoCard, VolumeChart } from '@/components/liquidity-pairs';
import { UiText } from '@/components/ui';
import { LIQUIDITY_PAIR_ID } from '@/constants/app';
import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import { FC } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

const Page: FC = () => {
  const { t } = useTranslation();

  const {
    loading: isPairDataLoading,
    data: pairData,
  } = useQuery<GetPairVitalsData, GetPairVitalsVars>(GetPairVitals, {
    variables: { pairId: LIQUIDITY_PAIR_ID },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
  });

  const pair = pairData?.pair || null;

  return (
    <>
      <Helmet>
        <title>{t('Home')}</title>
      </Helmet>
      <WrapperStyled>
        <ContentStyled>
          <TitleStyled>
            <UiText variant="h1">{t('FE Test exercise')}</UiText>
            <UiText paletteColor="text-secondary">{t('Good luck')} :)</UiText>
          </TitleStyled>

          <GridStyled>
            <TokenInfoCard pair={pair} targetToken={0} priceDecimals={1} loading={isPairDataLoading} />
            <TokenInfoCard pair={pair} targetToken={1} priceDecimals={5} loading={isPairDataLoading} />

            <LiquidityChart pairId={LIQUIDITY_PAIR_ID} />
            <VolumeChart pairId={LIQUIDITY_PAIR_ID} />
          </GridStyled>
        </ContentStyled>
      </WrapperStyled>
    </>
  );
};

const WrapperStyled = styled.div`
  min-height: 100vh;
  padding: 80px;
  box-sizing: border-box;
  display: flex;

  @media screen and (max-width: 1024px) {
    padding: 24px;
  }
`;

const ContentStyled = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: auto;
`;

const TitleStyled = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;
  padding: 0 16px;
  margin-bottom: 24px;
`;

const GridStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 12px 20px;

  @media screen and (max-width: 915px) {
    grid-template-columns: 1fr;
  }
`;

export default Page;
