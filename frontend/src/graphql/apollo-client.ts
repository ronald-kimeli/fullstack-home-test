import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { ApolloLink } from '@apollo/client/core';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.error(`GraphQL error: ${message}`);
      console.error(`Occurred at: ${locations}, Path: ${path}`);
    });
  }
  if (networkError) {
    console.error(`Network error: ${networkError}`);
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:4000" }),
]) as ApolloLink;

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});
