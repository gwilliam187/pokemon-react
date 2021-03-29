/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import Button from "components/Button";
import Dialog from "components/Dialog";
import { TPokemon } from "pages/PokemonDetailPage/graphql";

type TRemoveConfirmationDialogProps = {
  isOpen: boolean;
  pokemon?: TSelectedPokemon;
  removePokemon: (key: string) => void;
  handleClose: () => void;
};

export type TSelectedPokemon = {
  key: string;
  nickname?: string;
  pokemon: TPokemon;
};

const RemoveConfirmationDialog = ({
  isOpen,
  pokemon,
  removePokemon,
  handleClose,
}: TRemoveConfirmationDialogProps) => {
  if (!isOpen) return null;

  return (
    <Dialog isOpen={isOpen}>
      <div
        css={css`
          padding: 1rem;
          background-color: #ffffff;
          width: 400px;
          max-width: 70vw;
          border-radius: 4px;
          box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
        `}
      >
        <h3
          css={css`
            text-align: center;
          `}
        >
          {`Release ${
            pokemon?.nickname ? pokemon.nickname : pokemon?.pokemon.name
          }?`}
        </h3>
        <p>This action cannot be undone!</p>
        <div>
          <Button
            onClick={() => {
              pokemon && removePokemon(pokemon.key);
              handleClose();
            }}
            color="secondary"
            style={{ marginRight: "0.5rem" }}
          >
            Release
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </div>
      </div>
    </Dialog>
  );
};

export default RemoveConfirmationDialog;
