/** @jsxImportSource @emotion/react */
/**
 * Source: https://projects.lukehaas.me/css-loaders/
 */
import { css } from "@emotion/react";

const CircularProgress = () => {
  return (
    <div
      css={css`
        & {
          font-size: 10px;
          margin: 0;
          text-indent: -9999em;
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          background: #282828;
          background: -moz-linear-gradient(
            left,
            #282828 10%,
            rgba(40, 40, 40, 0) 42%
          );
          background: -webkit-linear-gradient(
            left,
            #282828 10%,
            rgba(40, 40, 40, 0) 42%
          );
          background: -o-linear-gradient(
            left,
            #282828 10%,
            rgba(40, 40, 40, 0) 42%
          );
          background: -ms-linear-gradient(
            left,
            #282828 10%,
            rgba(40, 40, 40, 0) 42%
          );
          background: linear-gradient(
            to right,
            #282828 10%,
            rgba(40, 40, 40, 0) 42%
          );
          position: relative;
          -webkit-animation: load3 0.6s infinite linear;
          animation: load3 0.6s infinite linear;
          -webkit-transform: translateZ(0);
          -ms-transform: translateZ(0);
          transform: translateZ(0);
        }
        &:before {
          width: 50%;
          height: 50%;
          background: #282828;
          border-radius: 100% 0 0 0;
          position: absolute;
          top: 0;
          left: 0;
          content: "";
        }
        &:after {
          background: #f5f5f5;
          width: 75%;
          height: 75%;
          border-radius: 50%;
          content: "";
          margin: auto;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
        }
        @-webkit-keyframes load3 {
          0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
          }
        }
        @keyframes load3 {
          0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
          }
        }
      `}
    ></div>
  );
};

export default CircularProgress;
