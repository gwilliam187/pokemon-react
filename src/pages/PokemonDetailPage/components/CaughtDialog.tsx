/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

type TCaughtDialogProps = {
  isOpen: boolean;
  isSuccessful: boolean;
};

const CaughtDialog = ({ isOpen, isSuccessful }: TCaughtDialogProps) => {
  if (!isOpen) return null;

  return (
    <div
      css={css`
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.2);
      `}
    >
      <div
        css={css`
          padding: 2rem;
          background-color: #ffffff;
          width: 400px;
          max-width: 70vw;
        `}
      >
        <p
          css={css`
            margin-top: 0;
            text-align: center;
          `}
        >
          Caught!
        </p>
        <div>
          <label>Nickname</label>
          <input />
        </div>
        <button>Save</button>
      </div>
    </div>
  );
};

export default CaughtDialog;
