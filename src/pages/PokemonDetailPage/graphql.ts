import { gql } from "@apollo/client";

export const GET_POKEMON = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      sprites {
        front_default
      }
      moves {
        move {
          url
          name
        }
      }
      types {
        type {
          url
          name
        }
      }
    }
  }
`;

export type TGetPokemonReq = {
  name: string;
};

export type TGetPokemonRes = {
  pokemon: TPokemon;
};

export type TPokemon = {
  id: string;
  name: string;
  sprites: {
    front_default: string;
  };
  moves: TMove[];
  types: TType[];
};

export type TMove = {
  move: TBaseName;
};

export type TType = {
  type: TBaseName;
};

export type TBaseName = {
  url: string;
  name: string;
};
