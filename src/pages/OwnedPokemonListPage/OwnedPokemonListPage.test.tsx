import { fireEvent, render, screen } from "@testing-library/react";

import AppContext, { TOwnedPokemons } from "AppContext";
import OwnedPokemonListPage from "./OwnedPokemonListPage";

describe("<OwnedPokemonListPage />", () => {
  const MOCK_OWNED_POKEMONS: TOwnedPokemons = {
    "test-owned-1": {
      pokemon: {
        id: "test-pokemon-1",
        name: "Test Pokemon 1",
        sprites: {
          front_default: "front_default_1",
        },
        moves: [
          {
            move: {
              url: "test-move-1-url",
              name: "Test Move 1",
            },
          },
        ],
        types: [
          {
            type: {
              url: "test-type-1",
              name: "Test Type 1",
            },
          },
        ],
      },
    },
  };

  it("correctly renders owned pokemon list", () => {
    render(
      <AppContext.Provider
        value={{
          ownedPokemons: MOCK_OWNED_POKEMONS,
          addPokemon: jest.fn(),
          removePokemon: jest.fn(),
        }}
      >
        <OwnedPokemonListPage />
      </AppContext.Provider>
    );

    Object.keys(MOCK_OWNED_POKEMONS).forEach((key) => {
      expect(
        screen.getByText(MOCK_OWNED_POKEMONS[key].pokemon.name)
      ).toBeInTheDocument();
    });
  });

  it("correctly handles remove click", () => {
    const removePokemon = jest.fn();

    render(
      <AppContext.Provider
        value={{
          ownedPokemons: MOCK_OWNED_POKEMONS,
          addPokemon: jest.fn(),
          removePokemon,
        }}
      >
        <OwnedPokemonListPage />
      </AppContext.Provider>
    );

    const releaseButton = screen.getByRole("button", { name: "Release" });
    fireEvent.click(releaseButton);
    expect(
      screen.getByText("This action cannot be undone!")
    ).toBeInTheDocument();

    const confirmReleaseButton = screen.getAllByRole("button", {
      name: "Release",
    });
    fireEvent.click(confirmReleaseButton[confirmReleaseButton.length - 1]);
    expect(removePokemon).toHaveBeenCalledTimes(1);
    expect(
      screen.queryByText("This action cannot be undone!")
    ).not.toBeInTheDocument();
  });
});
