import PokemonListPage from "pages/PokemonListPage/PokemonListPage";
import PokemonDetailPage from "pages/PokemonDetailPage/PokemonDetailPage";
import OwnedPokemonListPage from "pages/OwnedPokemonListPage/OwnedPokemonListPage";

export const ROUTE_LIST: TRouteList[] = [
  {
    url: "/pokemon",
    component: PokemonListPage,
  },
  {
    url: "/pokemon/:name",
    component: PokemonDetailPage,
  },
  {
    url: "/my-pokemon",
    component: OwnedPokemonListPage,
  },
];

type TRouteList = {
  url: string;
  component: any;
};
