import { gql } from "@apollo/client";

export const GET_POKEMON_LIST = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      results {
        id
        name
        image
      }
    }
  }
`;

export type TGetPokemonListReq = {
  limit: number;
  offset: number;
};

export type TGetPokemonListRes = {
  pokemons: {
    results: TPokemonListItem[];
  };
};

export type TPokemonListItem = {
  id: string;
  name: string;
  image: string;
};
