import { TPokemon } from "pages/PokemonDetailPage/graphql";
import { createContext } from "react";

const AppContext = createContext<TContext>({
  ownedPokemons: {},
  addPokemon: () => {},
  removePokemon: () => {},
});

export default AppContext;

export type TContext = {
  ownedPokemons: TOwnedPokemons;
  addPokemon: (pokemon: TPokemon, nickname: string) => void;
  removePokemon: (key: string) => void;
};

export type TOwnedPokemons = {
  [key: string]: {
    pokemon: TPokemon;
    nickname?: string;
  };
};
