import { GraphqlClient } from '@/api/graphql/sushi-exchange';
import App from '@/App';
import { ThemeProvider } from '@/context/theme';
import i18n from '@/i18n';
import { ApolloProvider } from '@apollo/client';
import 'normalize.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Helmet } from 'react-helmet';
import { HashRouter } from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <StrictMode>
    <ApolloProvider client={GraphqlClient}>
      <ThemeProvider>
        <HashRouter>
          <Helmet titleTemplate={`%s - Sushi ${i18n.t('Dashboard')}`} />
          <App />
        </HashRouter>
      </ThemeProvider>
    </ApolloProvider>
  </StrictMode>,
);
