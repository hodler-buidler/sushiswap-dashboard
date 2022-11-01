import { ApolloClient, InMemoryCache } from '@apollo/client';
import { QUERY_URL } from './constants';

export const GraphqlClient = new ApolloClient({
  uri: QUERY_URL,
  cache: new InMemoryCache()
})
