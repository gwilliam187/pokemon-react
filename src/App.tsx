/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { css } from "@emotion/react";

import AppContext, { TOwnedPokemons } from "./AppContext";
import { ROUTE_LIST } from "utils/routes";
import { client } from "utils/apollo";
import { TPokemon } from "pages/PokemonDetailPage/graphql";

function App() {
  const [ownedPokemons, setOwnedPokemons] = useState<TOwnedPokemons>({});

  useEffect(() => {
    const ownedPokemonsString = localStorage.getItem("OWNED_POKEMON") || "{}";
    const ownedPokemonsObj: TOwnedPokemons = JSON.parse(ownedPokemonsString);

    setOwnedPokemons(ownedPokemonsObj);
  }, []);

  useEffect(() => {
    localStorage.setItem("OWNED_POKEMON", JSON.stringify(ownedPokemons));
  }, [ownedPokemons]);

  const addPokemon = (pokemon: TPokemon, nickname: string) => {
    let newOwnedPokemon;

    if (nickname) {
      newOwnedPokemon = {
        [nickname]: {
          nickname,
          pokemon,
        },
      };
    } else {
      const ms = new Date().getTime();
      newOwnedPokemon = {
        [`${pokemon.name}-${ms}`]: {
          pokemon,
        },
      };
    }

    setOwnedPokemons({ ...ownedPokemons, ...newOwnedPokemon });
  };

  const removePokemon = (key: string) => {
    const { [key]: value, ...rest } = ownedPokemons;

    setOwnedPokemons(rest);
  };

  return (
    <ApolloProvider client={client}>
      <AppContext.Provider
        value={{
          ownedPokemons,
          addPokemon,
          removePokemon,
        }}
      >
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
      </AppContext.Provider>
    </ApolloProvider>
  );
}

export default App;
