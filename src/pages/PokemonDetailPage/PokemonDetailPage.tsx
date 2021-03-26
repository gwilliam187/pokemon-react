/** @jsxImportSource @emotion/react */
import { useHistory, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { css } from "@emotion/react";

import CircularProgress from "components/CircularProgress";
import CaughtDialog from "./components/CaughtDialog";

import { GET_POKEMON, TGetPokemonReq, TGetPokemonRes, TType } from "./graphql";

type TParams = {
  name: string;
};

const PokemonDetailPage = () => {
  const history = useHistory();
  const { name } = useParams<TParams>();

  const { data, loading } = useQuery<TGetPokemonRes, TGetPokemonReq>(
    GET_POKEMON,
    {
      variables: {
        name,
      },
    }
  );

  const handleCatchClick = () => {
    if (Math.random() > 0.5) {
      console.log("caught");
    } else {
      console.log("not caught");
    }
  };

  if (loading) {
    return (
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 1rem;
        `}
      >
        <CircularProgress />
        <span style={{ marginLeft: "0.5rem" }}>Loading pokemon</span>
      </div>
    );
  }

  return (
    <>
      <div
        css={css`
          padding: 1rem;
          margin-bottom: 50px;
        `}
      >
        <div
          css={css`
            display: flex;
          `}
        >
          <button
            onClick={() => {
              history.goBack();
            }}
            css={css`
              background-color: transparent;
              border: none;
              margin-top: 4px;
            `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </svg>
            Back
          </button>
        </div>
        <div
          css={css`
            @media only screen and (min-width: 600px) {
              display: flex;
            }
          `}
        >
          <div>
            <img
              src={data?.pokemon.sprites.front_default}
              alt={data?.pokemon.name}
              style={{ width: "360px", maxWidth: "100%" }}
            />
          </div>
          <div>
            <h1
              css={css`
                margin-right: 0.5rem;
                text-transform: capitalize;
              `}
            >
              {data?.pokemon.name}
            </h1>
            <div
              css={css`
                & h4 {
                  margin-bottom: 0;
                }
                & p {
                  margin-top: 0;
                }
              `}
            >
              <h4>Types</h4>
              <p>
                {formatTypesToCsv(
                  data?.pokemon.types ?? [],
                  data?.pokemon.types.length ?? 0
                )}
              </p>
              <h4>Moves</h4>
              <ul
                css={css`
                  margin: 0;
                  padding: 0;
                  list-style-type: none;
                `}
              >
                {data?.pokemon.moves.map((move) => (
                  <li>{move.move.name}</li>
                ))}
              </ul>
            </div>
          </div>
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
          <button onClick={handleCatchClick}>Catch</button>
        </div>
      </div>
      <CaughtDialog isOpen={true} isSuccessful={true} />
    </>
  );
};

export default PokemonDetailPage;

const formatTypesToCsv = (types: TType[], length: number) =>
  types.reduce(
    (acc, curr, i) => `${acc}${curr.type.name}${i < length - 1 ? ", " : ""}`,
    ""
  );
