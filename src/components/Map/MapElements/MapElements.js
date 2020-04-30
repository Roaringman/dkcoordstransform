import styled from "styled-components";
import * as React from "react";

import {
  blues,
  grays,
  breakpoints,
  OrangeAccent,
  TransparentBlack,
} from "../../../styles/elements";

export const LeafletContainer = styled.div`
  position: absolute;
  width: calc(100vw - 465px);
  height: 100vh;
  top: 0;
  left: 465px;
  z-index: 2;
  pointer-events: auto;

  @media (max-width: ${breakpoints.small}px) {
    visibility: hidden;
    display: none;
  }
`;

export const PopUpTable = styled.table`
  min-width: 100%;
  min-height: 100px;
`;

export const PopUpTH = styled.th`
  color: ${grays["100"]};
  background-color: ${blues["600"]};
  min-width: 20px;
  text-align: center;
  vertical-align: middle;
`;

export const PopUpTD = styled.td`
  color: ${grays["600"]};
  min-width: 5ch;
  border: 1px solid ${grays["300"]};
  padding: 0 5px;
  text-align: center;
  vertical-align: middle;
`;
