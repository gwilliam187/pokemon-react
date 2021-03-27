/** @jsxImportSource @emotion/react */
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { css } from "@emotion/react";

import BackButton from "components/BackButton";
import Button from "components/Button";
import RemoveConfirmationDialog, {
  TSelectedPokemon,
} from "./components/RemoveConfirmationDialog";
import AppContext, { TOwnedPokemons } from "AppContext";

const OwnedPokemonListPage = () => {
  const history = useHistory();

  const { ownedPokemons, removePokemon } = useContext(AppContext);

  const [selectedPokemon, setSelectedPokemon] = useState<TSelectedPokemon>();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <>
      <div
        css={css`
          padding: 1rem;
        `}
      >
        <BackButton handleClick={() => history.goBack()} />
        <h1>My Pokemon</h1>
        <div
          css={css`
            display: grid;
            grid-template-columns: repeat(1fr);
            grid-gap: 0.5rem;

            @media only screen and (min-width: 600px) {
              grid-template-columns: repeat(2, 1fr);
            }
          `}
        >
          {Object.keys(ownedPokemons).map((key) => {
            const ownedPokemon = ownedPokemons[key];

            return (
              <div
                css={css`
                  display: flex;
                  background-color: #ffffff;
                  border: 1px solid #dcdcdc;
                  border-radius: 4px;
                `}
                key={key}
              >
                <img
                  src={ownedPokemon.pokemon.sprites.front_default}
                  alt={key}
                ></img>
                <div
                  css={css`
                    margin-top: 1rem;
                    margin-left: 0.5rem;

                    & p {
                      margin: 0;
                    }
                  `}
                >
                  <p
                    css={css`
                      color: #57534e;
                    `}
                  >
                    {ownedPokemon.nickname ? `"${ownedPokemon.nickname}"` : ""}
                  </p>
                  <p
                    css={css`
                      text-transform: capitalize;
                      font-weight: bold;
                    `}
                  >
                    {ownedPokemon.pokemon.name}
                  </p>
                </div>
                <div
                  css={css`
                    margin-left: auto;
                    align-self: flex-end;
                    padding: 0.5rem;
                  `}
                >
                  <Button
                    onClick={() => {
                      setSelectedPokemon({
                        key,
                        nickname: ownedPokemon.nickname,
                        pokemon: ownedPokemon.pokemon,
                      });
                      setIsDialogOpen(true);
                    }}
                    color="secondary"
                  >
                    Release
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <RemoveConfirmationDialog
        isOpen={isDialogOpen}
        pokemon={selectedPokemon}
        removePokemon={(key) => {
          removePokemon(key);
        }}
        handleClose={() => setIsDialogOpen(false)}
      />
    </>
  );
};

export default OwnedPokemonListPage;
