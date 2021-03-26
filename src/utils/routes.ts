import PokemonListPage from "pages/PokemonListPage/PokemonListPage";
import PokemonDetailPage from "pages/PokemonDetailPage/PokemonDetailPage";

export const ROUTE_LIST: TRouteList[] = [
  {
    url: "/pokemon",
    component: PokemonListPage,
  },
  {
    url: "/pokemon/:name",
    component: PokemonDetailPage,
  },
];

type TRouteList = {
  url: string;
  component: any;
};
