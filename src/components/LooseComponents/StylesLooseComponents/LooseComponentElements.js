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
export const ProgressContainer = styled.span`
  display: flex;
  align-items: center;
  background-color: ${TransparentBlack};
  height: 5ch;
  padding: 0 10px;
`;

export const ProgressDescription = styled.h3`
  color: ${blues["100"]};

  align-text: right;
`;

export const ProgressIndicator = ({ num, done }) => (
  <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
    <circle
      cx="25"
      cy="25"
      r="20"
      fill={done ? "#F7B023" : `${blues["600"]}`}
    />
    <text x="20" y="28" fill={`${grays["100"]}`}>
      {num}
    </text>
  </svg>
);

export const ResetBtn = styled.button`
  pointer-events: all;

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

  @media (max-width: ${breakpoints.small}px) {
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
  position: in-line;
  display: flex;
  flex-direction: column;
  top: 100px;
  align-items: center;


  @media (max-width: ${breakpoints.small}px) {
    visibility: hidden;
    display: none;
  }
`;

export const SRSInfoButton = styled.button`
  border-radius: 5px;
  margin-bottom: 5px;
  border: solid 1px;
  border-color: #${OrangeAccent};
  color: ${grays["600"]};

  &:disabled {
    border-color: ${grays["600"]};
    color: ${grays["600"]};
  }

  @media (max-width: ${breakpoints.small}px) {
    visibility: hidden;
    display: none;
  }
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
  margin: 30px 10px;

  @media (max-width: ${breakpoints.medium}px) {
    grid-column-start: 6;
    grid-column-end: 7;
  }

  @media (max-width: ${breakpoints.small}px) {
    display: none;
  }
`;

export const DownloadButtonStyle = styled.button`
  z-index: 3;
  width: 100px;
  min-width: 100px;
  margin: 0 0px 20px;
  color: ${grays["100"]};
  background-color: #${OrangeAccent};
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  pointer-events: all;

  &:focus {
    border: solid 2px white;
  }

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: ${breakpoints.small}px) {
    position: absolute;
    top: 1050px;
    left: 30vw;
    margin: 0;
  }
`;



export const DownloadButtonStyleInactive = styled.button`
width: 100px;
  min-width: 100px;
  margin: 0 0px 20px;
  color: ${grays["200"]};
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  pointer-events: all;

  &:focus {
    border: solid 2px white;
  }

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: ${breakpoints.small}px) {
    position: absolute;
    top: 1050px;
    left: 30vw;
    margin: 0;
  }
`;

