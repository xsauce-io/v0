// ./apollo-client.js
import { ApolloClient, InMemoryCache } from "@apollo/client";


//TODO: add permission token
const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
    cache: new InMemoryCache(),
});

export default client;