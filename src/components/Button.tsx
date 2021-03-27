/** @jsxImportSource @emotion/react */
import { HTMLProps } from "react";
import { css } from "@emotion/react";

type TButtonProps = HTMLProps<HTMLButtonElement> & {
  color?: "primary" | "secondary" | "default";
};

const Button = ({ onClick, children, color = "default" }: TButtonProps) => {
  let buttonColor = "transparent";
  switch (color) {
    case "primary":
      buttonColor = "#3b82f6";
      break;
    case "secondary":
      buttonColor = "#EF4444";
      break;
    default:
      break;
  }

  let textColor = "#282828";
  switch (color) {
    case "primary":
    case "secondary":
      textColor = "white";
      break;
    default:
      break;
  }

  return (
    <button
      onClick={onClick}
      css={css`
        border: none;
        background-color: ${buttonColor};
        color: ${textColor};
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font-weight: bold;

        &:hover {
          cursor: pointer;
        }
      `}
    >
      {children}
    </button>
  );
};

export default Button;
