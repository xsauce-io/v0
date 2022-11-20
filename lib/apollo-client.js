// ./apollo-client.js
import { ApolloClient, InMemoryCache } from "@apollo/client";


//TODO: add permission token
const client = new ApolloClient({
    uri: "https://api-ca-central-1.hygraph.com/v2/clab1vqsj3h3d01tf2e7ud68l/master",
    cache: new InMemoryCache(),
});

export default client;