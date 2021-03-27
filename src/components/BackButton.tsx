/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export type TBackButtonProps = {
  handleClick: () => void;
};

const BackButton = ({ handleClick }: TBackButtonProps) => {
  return (
    <button
      onClick={handleClick}
      css={css`
        display: flex;
        align-items: center;
        background-color: transparent;
        border: none;
        margin-top: 4px;
        padding-left: 0;
        font-weight: bold;

        &:hover {
          cursor: pointer;
        }
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
        />
      </svg>
      <p
        css={css`
          margin: 0;
          margin-left: 0.25rem;
        `}
      >
        Back
      </p>
    </button>
  );
};

export default BackButton;
