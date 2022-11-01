import { UiApp } from '@/components/ui';
import { FC } from 'react';
import { AppRoutes } from './routing';

const App: FC = () => {
  return (
    <UiApp>
      <AppRoutes />
    </UiApp>
  );
};

export default App;
