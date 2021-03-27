import { MemoryRouter, Route } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { createMemoryHistory } from "history";

import PokemonDetailPage from "./PokemonDetailPage";
import { GET_POKEMON } from "./graphql";
import { act } from "react-dom/test-utils";

describe("<PokemonDetailPage />", () => {
  const MOCKS = [
    {
      request: {
        query: GET_POKEMON,
        variables: {
          name: "test-pokemon",
        },
      },
      result: {
        data: {
          pokemon: {
            id: "test",
            name: "test-pokemon",
            sprites: {
              front_default: "test-front-default",
            },
            moves: [
              {
                move: {
                  url: "test-move-url",
                  name: "test-move",
                },
              },
            ],
            types: [
              {
                type: {
                  url: "test-type-url",
                  name: "test-type",
                },
              },
            ],
          },
        },
      },
    },
  ];

  const history = createMemoryHistory();
  const route = "/pokemon/test-pokemon";
  history.push(route);

  it("renders loading indicator while fetching", async () => {
    await act(async () => {
      render(
        <MockedProvider mocks={MOCKS} addTypename={false}>
          <MemoryRouter initialEntries={["/pokemon/test-pokemon"]}>
            <Route exact path="/pokemon/:name" component={PokemonDetailPage} />
          </MemoryRouter>
        </MockedProvider>
      );
    });
    expect(screen.getByText("Loading pokemon")).toBeInTheDocument();
  });

  it("renders pokemon detail according to the GraphQL response", async () => {
    await act(async () => {
      render(
        <MockedProvider mocks={MOCKS} addTypename={false}>
          <MemoryRouter initialEntries={["/pokemon/test-pokemon"]}>
            <Route exact path="/pokemon/:name" component={PokemonDetailPage} />
          </MemoryRouter>
        </MockedProvider>
      );

      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(
      screen.getByText(MOCKS[0].result.data.pokemon.name)
    ).toBeInTheDocument();

    MOCKS[0].result.data.pokemon.types.forEach((type) => {
      expect(screen.getByText(type.type.name)).toBeInTheDocument();
    });

    MOCKS[0].result.data.pokemon.moves.forEach((move) => {
      expect(screen.getByText(move.move.name)).toBeInTheDocument();
    });
  });
});
