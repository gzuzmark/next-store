import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
// import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';

// import fetch from 'isomorphic-unfetch';
import { endpoint } from '../config';

// const defaultOptions = {
//   watchQuery: {
//     fetchPolicy: 'no-cache',
//     errorPolicy: 'ignore',
//   },
//   query: {
//     fetchPolicy: 'no-cache',
//     errorPolicy: 'all',
//   },
// };

// const link = createHttpLink({
//   // fetch, // Switches between unfetch & node-fetch for client & server.
//   uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
// });

// function createClient({ headers }) {
//   return new ApolloClient({
//     link,
//     cache: new InMemoryCache(),
//     defaultOptions,
//   });
// }

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
  });
}

export default withApollo(createClient);
