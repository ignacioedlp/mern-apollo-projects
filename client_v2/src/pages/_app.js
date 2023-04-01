import '@/styles/globals.css'
import useAuth, { AuthProvider } from "../hooks/userAuth.jsx";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: `${process.env.URI_GRAPH}/graphql`,
  cache: new InMemoryCache(),
});


export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ApolloProvider>
  )
}
