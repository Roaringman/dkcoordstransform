import styled from "styled-components";
import * as React from "react";

import {
  blues,
  grays,
  breakpoints,
  OrangeAccent,
  TransparentBlack,
} from "../../../styles/elements";

export const ProgressItem = styled.div`
  position: relative;
  height: 50px;
  width: 50px;
  margin: 0 25px 20px 0;
  pointer-events: all;
`;

export const ProgressDescription = styled.h3`
  color: ${blues["100"]};
  background-color: ${TransparentBlack};
  align-text: right;
  height: 5ch;
`;

export const ProgressIndicator = ({ num, done }) => (
  <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
    <circle
      cx="25"
      cy="25"
      r="20"
      fill={done ? "#F7B023" : `${blues["600"]}`}
    />
    <text x="25" y="25" fill={`${grays["100"]}`}>
      {num}
    </text>
  </svg>
);

export const ResetBtn = styled.button`
  pointer-events: all;
  grid-column-start: 4;
  grid-column-end: 5;
  grid-row-start: 6;
  grid-row-end: 7;
  align-self: start;
  width: 100px;
  min-width: 100px;
  height: 50px;
  border: 2px;
  border: solid;
  background-color: rgba(116, 217, 159, 0.2);
  border-color: rgba(116, 217, 159, 0.5);
  border-radius: 5px;
  padding: 0;
  z-index: 3;
  color: ${grays["700"]};
  &:hover {
    background-color: #74d99f;
    border: none;
    color: ${grays["100"]};
  }

  @media (max-width: ${breakpoints.medium}px) {
    grid-column-start: 5;
    grid-column-end: 6;
  }

  @media (max-width: ${breakpoints.small}px) {
    position: absolute;
    right: calc(50% - 50px);
    top: calc(900px - 56px);
  }
`;

export const ResetBtnHighlight = styled(ResetBtn)`
  background-color: rgba(116, 217, 159, 0.8);
  color: ${grays["100"]};
`;

export const SRSInfoBoxArrow = styled.div`
  width: 0;
  height: 0;
  border-radius: 2px;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 15px solid #${OrangeAccent};
`;

export const SRSInfoBoxText = styled.div`
  background-color: ${TransparentBlack};
  color: ${grays["100"]};
  padding: 10px;
  height: 80px;
`;

export const SRSInfoBoxPopUp = styled.aside`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 10px;
  align-items: center;
`;

export const DisplayCoordinatesInfo = styled(SRSInfoBoxText)`
  display: flex;
  justify-content: center;
  padding: 10px 0 10px 10px;
  align-items: center;
  grid-column-start: 2;
  grid-row-start: 2;

  width: 100%;
  height: 3em;
  z-index: 3;
  hyphens: auto;
  overflow-y: auto;
  min-width: 10em;

  @media (max-width: ${breakpoints.medium}px) {
    grid-column-start: 6;
    grid-column-end: 7;
  }

  @media (max-width: ${breakpoints.small}px) {
    display: none;
  }
`;
