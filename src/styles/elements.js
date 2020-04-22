import styled from "styled-components";
import * as React from "react";

/*const darkBLue = "#20639B";
const grayishDark = "#6B7175";
const paleBLue = "#96CEF7";
const lightBlue = "#E0EDF6";
const gray = "#B0BBC2";*/

export const breakpoints = {
  small: 1100,
  medium: 1445,
};

export const OrangeAccent = "F7B023";

export const blues = {
  "100": "#F0F4FE",
  "200": "#6B90A9", //"#D4DEF8",
  "300": "#95AEED",
  "400": "#758CE0",
  "500": "#6175DE",
  "600": "#495DC6",
  "700": "#3547A4",
  "800": "#253586",
  "900": "#1F2C6D",
};
export const grays = {
  "100": "#F8F9FA",
  "200": "#E1E7EC",
  "300": "#D5DDE5",
  "400": "#CCD4DB",
  "500": "#AEBECD",
  "600": "#929FB1",
  "700": "#6E7A8A",
  "800": "#404B5A",
  "900": "#202833",
};

export const Title = styled.h1`
  position: relative;
  z-index: 3;
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

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

// SRS TRANSFORM COMPONENT STYLES

export const FlexColumnCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 4rem;
  @media (max-width: ${breakpoints.medium}px) {
    height: 4rem;
  }
`;

export const SRSInfoBoxArrow = styled.div`
  width: 0;
  height: 0;
  border-left: 45px solid transparent;
  border-right: 45px solid transparent;
  border-top: 45px solid #f00;
`;

export const SRSInfoBoxText = styled.div`
  background-color: purple;
  color: white;
  padding: 10px;
`;

export const SRSInfoBoxPopUp = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 53px;
  align-items: center;
`;

export const TransformSelectContainer = styled.section`
  position: absolute;
  width: 100vw;
  height: 135px;
  top: 135px;
  background-color: ${grays["200"]};
  z-index: 4;
  @media (min-width: ${breakpoints.medium}px) {
    height: 135px;
  }
  @media (max-width: ${breakpoints.small}px) {
    top: 0px;
    height: calc(135px * 2);
    background-color: ${blues["400"]};
    box-shadow: 0 6px 4px -4px rgba(0, 0, 0, 0.7);
  }
`;

export const TransformSelectGrid = styled.div`
  display: grid;
  width: 100%;
  height: 135px;
  grid-template-columns: repeat(11, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 20px;
  align-items: center;

  @media (max-width: ${breakpoints.small}px) {
    display: flex;
    flex-direction: column;
    align-items: start;
    height: 250px;
  }
`;

export const SrsTitleBackground = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  height: 135px;
  width: 465px;
  background-color: ${blues["600"]};

  @media (max-width: ${breakpoints.small}px) {
    width: 100%;

    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 3;
    justify-content: center;
    box-shadow: 0 6px 4px -4px rgba(0, 0, 0, 0.7);
  }
`;

export const SrsTitle = styled.h1`
  font-size: 4rem;
  letter-spacing: 5px;
  text-align: right;
  color: ${grays["100"]};
  margin-right: 10px;
  @media (max-width: ${breakpoints.small}px) {
    margin: 20px;
    text-align: center;
  }
`;

export const SrsLabel = styled.label`
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 4rem;
  grid-row-start: 1;
  grid-row-end: 2;
  color: ${grays["800"]};

  margin: 0 20px;
  @media (max-width: ${breakpoints.medium}px) {
    font-size: 2rem;
    margin: 0 10px 5px;
    align-items: flex-end;
  }

  @media (max-width: ${breakpoints.small}px) {
    color: ${grays["100"]};
    margin: 0 10px;
    width: 5ch;
    margin: 0;
    align-items: center;
  }
`;

export const SrsSelect = styled.select`
  font-size: 1rem;
  text-align: center;
  background-color: ${blues["100"]};
  color: ${grays["700"]};
  border-radius: 5px;
  font-family: "Overpass", sans-serif;
  width: 27ch;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
  background-color: #fff;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23${OrangeAccent}%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
    linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  

  &:focus {
    border-color: ${grays["600"]};
    box-shadow: 0 0 1px 1px rgba(247, 176, 35, .1);
    box-shadow: 0 0 0 1px -moz-mac-focusring;
    outline: none;
  }
  :hover {
    border-color: #888;
  }

  @media (max-width: ${breakpoints.medium}px) {
    height: 2rem;
    font-size: 0.8rem;
    width: 27ch;
  }

  @media (max-width: ${breakpoints.small}px) {
    font-size: 0.8rem;
    width: 25ch;
  }
`;

export const SrsFormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column-start: 2;
  grid-column-end: 12;
  grid-row-start: 1;
  grid-row-end: 3;
  height: 135px;
  width: 100%;

  @media (max-width: ${breakpoints.medium}px) {
    grid-column-start: 2;
    grid-column-end: 12;
  }

  @media (max-width: ${breakpoints.small}px) {
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
`;

export const SrsFrom = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  height: 4rem;
  @media (max-width: ${breakpoints.small}px) {
    justify-content: space-between;
    align-items: space-between;
  }
`;
export const SrsTo = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  height: 4rem;
  @media (max-width: ${breakpoints.small}px) {
    justify-content: space-between;
    align-items: space-between;
  }
`;

// UL and FORM for coordinate input

export const UIContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 7;
  height: 100vh;
  width: 465px;
  min-width: 345px;
  background-color: ${grays["200"]};
  z-index: 3;
  min-height: 900px;
  overflow-x: none;

  @media (max-width: ${breakpoints.small}px) {
    grid-column-start: 1;
    grid-column-end: 12;
    min-width: 100%;
    height: 100vh;
    overflow: auto;
    background-color: ${blues["300"]};
  }
`;

export const CheckMark = styled.span`
  border-radius: 5px;

  @media (max-width: ${breakpoints.small}px) {
    height: 25px;
  }
`;

// STATUS STUFF

export const StatusContainer = styled.section`
  position: absolute;
  width: 250px;
  height: 400px;
  top: 350px;
  right: 50px;
  pointer-events: none;
  display: transparent;
  z-index: 3;

  @media (max-width: ${breakpoints.small}px) {
    visibility: hidden;
  }
`;

export const ProgressItem = styled.div`
  position: relative;
  height: 50px;
  width: 50px;
  margin: 0 25px 20px 0;
  pointer-events: all;
`;

export const ProgressDescription = styled.h3`
  color: ${blues["100"]};
  background-color: #00000080;
  align-text: right;
  height: 5ch;
`;

export const FlexRowRightAligned = styled(FlexRow)`
  justify-content: flex-end;
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
