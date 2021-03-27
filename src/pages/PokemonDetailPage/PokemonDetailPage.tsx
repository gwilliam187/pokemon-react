/** @jsxImportSource @emotion/react */
import { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { css } from "@emotion/react";

import BackButton from "components/BackButton";
import Button from "components/Button";
import CircularProgress from "components/CircularProgress";
import FixedBottomNav from "components/FixedBottomNav";
import CaughtDialog from "./components/CaughtDialog";
import AppContext from "AppContext";

import { GET_POKEMON, TGetPokemonReq, TGetPokemonRes, TType } from "./graphql";

type TParams = {
  name: string;
};

const PokemonDetailPage = () => {
  const history = useHistory();
  const { name } = useParams<TParams>();
  const { addPokemon } = useContext(AppContext);

  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

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
      setIsSuccessful(true);
    } else {
      setIsSuccessful(false);
    }

    setIsDialogOpen(true);
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
          <BackButton handleClick={() => history.goBack()} />
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
          <div
            css={css`
              width: 100%;
            `}
          >
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
                  display: grid;
                  grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
                  grid-column-gap: 1rem;
                  list-style-type: none;
                `}
              >
                {data?.pokemon.moves.map((move) => (
                  <li key={move.move.name}>{move.move.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <FixedBottomNav>
          <p>
            <b>50%</b> chance to catch
          </p>
          <div
            css={css`
              margin-left: auto;
            `}
          >
            <Button onClick={handleCatchClick} color="primary">
              Catch
            </Button>
          </div>
        </FixedBottomNav>
      </div>
      <CaughtDialog
        isOpen={isDialogOpen}
        pokemon={data?.pokemon}
        isSuccessful={isSuccessful}
        savePokemon={(pokemon, nickname = "") => {
          if (pokemon) {
            addPokemon(pokemon, nickname);
          }
          setIsDialogOpen(false);
        }}
        handleClose={() => setIsDialogOpen(false)}
      />
    </>
  );
};

export default PokemonDetailPage;

const formatTypesToCsv = (types: TType[], length: number) =>
  types.reduce(
    (acc, curr, i) => `${acc}${curr.type.name}${i < length - 1 ? ", " : ""}`,
    ""
  );
