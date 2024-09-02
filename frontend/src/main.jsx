import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";
import { AuthProvider } from "./context/AuthContext.jsx";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("barley-user");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

// const httpLink = createHttpLink({
//   uri: "http://localhost:4001",
// });
// const httpLink = createHttpLink({
//   uri: "http://localhost:3000/graphql",
// });
// const httpLink = createHttpLink({
//   uri: "http://localhost:8080/v1/graphql",
//   headers: {
//     "x-hasura-admin-secret": "myadminsecret",
//   },
// });
const httpLink = createHttpLink({
  uri: "/v1/graphql",
  headers: {
    "x-hasura-admin-secret": "myadminsecret",
  },
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ApolloProvider>
    </BrowserRouter>
  </StrictMode>
);
