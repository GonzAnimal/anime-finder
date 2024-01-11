import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Page: {
          fields: {
            media: {
              merge(existing = [], incoming) {
                return [...existing, ...incoming];
              },
            },
            characters: {
              merge(existing = [], incoming) {
                return [...existing, ...incoming];
              },
            },
            pageInfo: {
              merge(existing, incoming) {
                return { ...existing, ...incoming };
              },
            },
          },
        },
      },
    }),
    link: new HttpLink({
      uri: process.env.API_URL,
    }),
  });
});
