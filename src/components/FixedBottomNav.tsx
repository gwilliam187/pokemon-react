/** @jsxImportSource @emotion/react */
import { HTMLProps } from "react";
import { css } from "@emotion/react";

type TFixedBottomNavProps = HTMLProps<HTMLDivElement>;

const FixedBottomNav = ({ children }: TFixedBottomNavProps) => {
  return (
    <div
      css={css`
        position: fixed;
        bottom: 0;
        left: 0;
        height: 60px;
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0 1rem;
        background-color: #ffffff;
        box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.15);
        box-sizing: border-box;
      `}
    >
      {children}
    </div>
  );
};

export default FixedBottomNav;
