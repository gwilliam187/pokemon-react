/** @jsxImportSource @emotion/react */
import { useContext, useEffect, useState } from "react";
import { css } from "@emotion/react";

import Button from "components/Button";
import Dialog from "components/Dialog";
import AppContext from "AppContext";

import { capitalize } from "utils/helpers";

import { TPokemon } from "../graphql";

type TCaughtDialogProps = {
  isOpen: boolean;
  pokemon?: TPokemon;
  isSuccessful: boolean;
  savePokemon: (pokemon?: TPokemon, nickname?: string) => void;
  handleClose: () => void;
};

const CaughtDialog = ({
  isOpen,
  pokemon,
  isSuccessful,
  savePokemon,
  handleClose,
}: TCaughtDialogProps) => {
  const { ownedPokemons } = useContext(AppContext);

  const [nickname, setNickname] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setNickname("");
  }, [isOpen]);

  const handleSaveClick = () => {
    if (ownedPokemons[nickname]?.hasOwnProperty("pokemon")) {
      setError("This nickname is already taken");
    } else {
      savePokemon(pokemon, nickname);
    }
  };

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
            text-transform: capitalize;
          `}
        >
          {`${pokemon?.name} ${isSuccessful ? "Caught" : "Espaced"}!`}
        </h3>
        {isSuccessful ? (
          <div>
            <input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveClick();
              }}
              placeholder="John Doe"
              css={css`
                display: block;
                width: 100%;
                padding: 0.5rem;
                font-size: 0.9rem;
                box-sizing: border-box;
                border: 1px solid ${error ? "#ef4444" : "#71717a"};
                border-radius: 4px;
              `}
            />
            <span
              css={css`
                font-size: 0.8rem;
                color: ${error ? "#ef4444" : "#78716c"};
              `}
            >
              {error ? error : `Optionally, give ${pokemon?.name} a nickname`}
            </span>
          </div>
        ) : (
          <p>{`${capitalize(
            pokemon?.name || ""
          )} ran off into the wilderness`}</p>
        )}

        <div
          css={css`
            margin-top: 1rem;
          `}
        >
          {isSuccessful ? (
            <Button onClick={handleSaveClick} color="primary">
              Save
            </Button>
          ) : (
            <Button onClick={handleClose}>Close</Button>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default CaughtDialog;
