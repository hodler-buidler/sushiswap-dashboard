import { BaseLayout } from '@/layouts';
import LiquidityPairPage from '@/pages/liquidity-pairs/Home';
import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

export const AppRoutes: FC = () => {
  const FallbackView = <Navigate to="/" />;

  return (
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<LiquidityPairPage />} />
        <Route path="*" element={FallbackView} />
      </Route>
    </Routes>
  );
};
