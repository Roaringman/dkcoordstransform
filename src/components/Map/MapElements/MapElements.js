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
