import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import PokemonListPage from "./PokemonListPage";
import { GET_POKEMON_LIST } from "./graphql";
import { act } from "react-dom/test-utils";

describe("<PokemonListPage />", () => {
  it("matches snapshot", async () => {
    window.IntersectionObserver = jest.fn(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      root: jest.fn(),
      rootMargin: jest.fn(),
      thresholds: jest.fn(),
      disconnect: jest.fn(),
      takeRecords: jest.fn(),
    }));

    const MOCKS = [
      {
        request: {
          query: GET_POKEMON_LIST,
          variables: {
            limit: 30,
            offset: 0,
          },
        },
        result: {
          data: {
            pokemons: {
              results: [
                {
                  id: "1",
                  name: "pokemon-1",
                  image: "pokemon-1-image",
                },
              ],
            },
          },
        },
      },
    ];

    act(() => {
      const { container } = render(
        <MockedProvider mocks={MOCKS} addTypename={false}>
          <BrowserRouter>
            <PokemonListPage />
          </BrowserRouter>
        </MockedProvider>
      );

      expect(container).toMatchSnapshot();
    });
  });
});
