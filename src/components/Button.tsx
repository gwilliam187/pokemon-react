/** @jsxImportSource @emotion/react */
import { HTMLProps } from "react";
import { css } from "@emotion/react";

type TButtonProps = HTMLProps<HTMLButtonElement> & {
  color?: "primary" | "secondary" | "default";
};

const Button = ({
  onClick,
  children,
  color = "default",
  style,
}: TButtonProps) => {
  let buttonColor = "transparent";
  let textColor = "#282828";
  let borderColor = "#282828";

  switch (color) {
    case "primary":
      buttonColor = "#3b82f6";
      textColor = "white";
      borderColor = "#3b82f6";
      break;
    case "secondary":
      buttonColor = "#EF4444";
      textColor = "white";
      borderColor = "#EF4444";
      break;
    default:
      break;
  }

  return (
    <button
      onClick={onClick}
      css={css`
        border: 1px solid ${borderColor};
        background-color: ${buttonColor};
        color: ${textColor};
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font-weight: bold;

        &:hover {
          cursor: pointer;
        }
      `}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
