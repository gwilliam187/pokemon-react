/** @jsxImportSource @emotion/react */
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { css } from "@emotion/react";

import { ROUTE_LIST } from "utils/routes";
import { client } from "utils/apollo";

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <div
            css={css`
              max-width: 960px;
              margin: auto;
            `}
          >
            <Route exact path="/">
              <Redirect to="/pokemon" />
            </Route>
            {ROUTE_LIST.map((route) => (
              <Route
                exact
                path={route.url}
                component={route.component}
                key={route.url}
              />
            ))}
          </div>
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
