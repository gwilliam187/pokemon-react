/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { css } from "@emotion/react";

import CircularProgress from "components/CircularProgress";

import {
  GET_POKEMON_LIST,
  TGetPokemonListReq,
  TGetPokemonListRes,
  TPokemonListItem,
} from "./graphql";

const PokemonListPage = () => {
  const [pokemonList, setPokemonList] = useState<TPokemonListItem[]>([]);

  const loadingRef = useRef<any>(null);
  const [getPokemon, { loading }] = useLazyQuery<
    TGetPokemonListRes,
    TGetPokemonListReq
  >(GET_POKEMON_LIST, {
    onCompleted: (data) => {
      setPokemonList([...pokemonList, ...data.pokemons.results]);
    },
  });

  const handleObserverInView = useCallback(
    (entries: any[]) => {
      if (entries[0].isIntersecting) {
        getPokemon({
          variables: {
            limit: LIMIT,
            offset: pokemonList.length,
          },
        });
      }
    },
    [pokemonList]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserverInView, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    const loadingRefCurr = loadingRef.current;

    loadingRefCurr && observer.observe(loadingRefCurr);

    return () => {
      observer.disconnect();
    };
  }, [handleObserverInView]);

  return (
    <div
      css={css`
        padding: 1rem;
        margin-bottom: 50px;
      `}
    >
      <h1>All Pokemons</h1>
      <div
        css={css`
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
          grid-gap: 0.5rem;
        `}
      >
        {pokemonList.map((pokemon) => (
          <Link
            to={`/pokemon/${pokemon.name}`}
            style={{ textDecoration: "none" }}
            key={pokemon.id}
          >
            <div
              css={css`
                display: flex;
                flex-direction: column;
                background-color: #ffffff;
                border: 1px solid #dcdcdc;
                border-radius: 4px;

                & img {
                }

                & p {
                  color: #404040;
                  text-align: center;

                  &:first-letter {
                    text-transform: capitalize;
                  }
                }
              `}
            >
              <img src={pokemon.image} alt={pokemon.name} />
              <p>{pokemon.name}</p>
            </div>
          </Link>
        ))}
      </div>
      <div ref={loadingRef}>
        {loading && (
          <div
            css={css`
              display: flex;
              align-items: center;
              justify-content: center;
              margin-top: 1rem;
            `}
          >
            <CircularProgress />
            <span style={{ marginLeft: "0.5rem" }}>Loading Pokemons</span>
          </div>
        )}
      </div>
      <div
        css={css`
          position: fixed;
          bottom: 0;
          left: 0;
          height: 50px;
          width: 100%;
          background-color: #ffffff;
          box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.15);
        `}
      >
        Owned: 0 See all
      </div>
    </div>
  );
};

export default PokemonListPage;

const LIMIT = 30;
