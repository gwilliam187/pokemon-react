/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

type TDialogProps = {
  isOpen: boolean;
  children: any;
};

const Dialog = ({ isOpen, children }: TDialogProps) => {
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
      {children}
    </div>
  );
};

export default Dialog;
