import styled from "styled-components";
import * as React from "react";
import { motion } from "framer-motion";

/*const darkBLue = "#20639B";
const grayishDark = "#6B7175";
const paleBLue = "#96CEF7";
const lightBlue = "#E0EDF6";
const gray = "#B0BBC2";*/

const breakpoints = {
  small: 900,
  medium: 1250,
};

const OrangeAccent = "F7B023";

const blues = {
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
const grays = {
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

export const BtnContainer = styled.div`
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 6;
  grid-row-end: 7;
  display: flex;
  width: 100%;

  justify-content: center;
  @media (max-width: ${breakpoints.small}px) {
    grid-column-end: 12;
  }
`;

export const ActiveBtn = styled(motion.button)`
  postion: relative;
  width: 10ch;
  min-width: 140px;
  height: 50px;
  border: none;
  background-color: #fce8e8;
  border-radius: 5px;
  margin: 0 20px;
  padding: 0;
  &:hover {
    background-color: #e46464;
  }
`;

export const InactiveBtn = styled.button`
  postion: relative;
  width: 10ch;
  min-width: 140px;
  margin: 0 20px;
  height: 50px;
  border: 1px;
  border-style: solid;
  border-color: ${grays["500"]};
  background-color: ${grays["200"]};
  color: ${grays["500"]};
  border-radius: 5px;
  padding: 0;
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

export const Filler = styled.div`
  grid-row-start: 2;
  grid-row-end: 3;
  grid-column-start: 1;
  grid-column-end: 4;
  background-color: ${grays["200"]};

  @media (max-width: ${breakpoints.small}px) {
    grid-row-start: 1;
    grid-column-end: 3;
    grid-column-end: 12;
    height: 250px;
    background-color: pink;
  }
`;

export const TransformSelectContainer = styled.section`
  position: absolute;
  width: 100%;
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
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 3;
  height: 135px;
  width: 100%;
  min-width: 345px;
  background-color: ${blues["600"]};

  @media (max-width: ${breakpoints.small}px) {
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
  grid-column-start: 4;
  grid-column-end: 11;
  grid-row-start: 1;
  grid-row-end: 3;
  height: 135px;
  width: 100%;

  @media (max-width: ${breakpoints.medium}px) {
    grid-column-start: 5;
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
export const OverflowUL = styled.section`
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 4;
  grid-row-end: 6;
  overflow: auto;
  overflow-x: auto;
  background-color: ${blues["100"]};
  z-index: 3;

  @media (max-width: ${breakpoints.small}px) {
    border-radius: 0;
    grid-column-start: 1;
    grid-column-end: 12;
    box-shadow: inset 0 6px 4px -4px rgba(0, 0, 0, 0.7),
      inset 0 -6px 4px -4px rgba(0, 0, 0, 0.7);
  }
`;

export const CoordinateAddForm = styled.div`
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 3;
  grid-row-end: 4;
  display: flex;
  justify-content: center;
  min-width: 125px;
  margin: 0 20px;

  @media (max-width: ${breakpoints.small}px) {
    grid-column-start: 1;
    grid-column-end: 12;
    min-height: 170px;
  }
`;

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
  width: 100%;
  min-width: 345px;
  background-color: ${grays["200"]};
  z-index: 3;
  min-height: 900px;
  overflow-x: none;

  @media (max-width: ${breakpoints.small}px) {
    grid-column-start: 1;
    grid-column-end: 12;
    min-width: 100%;
    overflow: auto;
    background-color: ${blues["300"]};
  }
`;

export const CenteredH2 = styled.h2`
  width: 100%;
  color: ${grays["500"]};
  font-size: 1.3rem;
  margin-top: 2rem;
  text-align: center;
`;

//

export const UlFlex = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  list-style-type: none;
`;

export const CoordinateForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

export const CoordinateInput = styled.input`
  background-color: ${blues["100"]};
  color: ${grays["700"]};
  margin: 10px 10px;
  height: 1.5rem;
  border-radius: 5px;
  border: none;
  min-width: 10ch;
  max-width: 18ch;
  @media (max-width: ${breakpoints.small}px) {
    height: 2rem;
    margin: 10px 10px;
  }
`;

export const CoordinateSubmit = styled.input`
  align-self: center;
  justify-self: baseline;
  margin-top: auto;
  width: 60%;
  border-radius: 5px;
  border: solid 2px;
  border-color: #${OrangeAccent};
  height: 2.3rem;
  color: ${grays["700"]};
  background-color: #${OrangeAccent}10;
  &:focus {
    border-color: #${OrangeAccent};
    box-shadow: 0 0 1px 1px rgba(247, 176, 35, 0.9);
    box-shadow: 0 0 0 1px -moz-mac-focusring;
    outline: none;
  }
  &:hover {
    background-color: #${OrangeAccent};
    color: ${grays["100"]};
  }
  &:disabled {
    border-color: ${grays["500"]};
    background-color: ${grays["200"]};
    color: ${grays["500"]};
  }
`;

export const Checkbox = styled.input`
  &:focus {
    border-color: ${grays["600"]};
    box-shadow: 0 0 1px 1px rgba(247, 176, 35, 0.1);
    box-shadow: 0 0 0 1px -moz-mac-focusring;
    outline: none;
  }
`;
export const CheckMark = styled.span`
  border-radius: 5px;

  @media (max-width: ${breakpoints.small}px) {
    height: 25px;
  }
`;

// TABLE STUFF

export const Table = styled.table`
  min-width: 100%;
`;

export const TableTD = styled.td`
  padding: 0 10px;
  width: 18ch;
  vertical-align: middle;
`;

export const TableHD = styled.th`
  vertical-align: middle;
  padding: 0 10px;
  height: 1.8rem;
  width: 18ch;
  font-weight: bold;
  text-align: left;
  color: ${grays["100"]};
  background-color: ${blues["400"]};
  @media (max-width: ${breakpoints.small}px) {
    box-shadow: inset 0 6px 4px -4px rgba(0, 0, 0, 0.7);
  }
`;

export const RemoveRowH = styled(TableHD)`
  width: 23px;
`;

export const TableRow = styled(motion.tr)`
  height: 1.5rem;
  text-align: right;
  color: ${grays["700"]};
  border-bottom: 1px solid ${grays["300"]};
  &:hover {
    background-color: ${blues["800"]};
    color: ${grays["100"]};
    path {
      stroke: ${grays["100"]};
    }
  }
  &:last-child {
    border-bottom: none;
  }

  @media (max-width: ${breakpoints.small}px) {
    height: 2rem;
  }
`;

export const InputTableRow = styled.tr`
  display: flex;
`;

const Path = (props) => (
  <motion.path
    whileHover={{ scale: 1.2 }}
    fill="transparent"
    strokeWidth="3"
    stroke={`${grays["700"]}`}
    strokeLinecap="round"
    {...props}
  />
);

const RemoveBtn = styled.button`
  border: none;
  background-color: transparent;
`;

export const CloseButton = ({ close }) => (
  <RemoveBtn onClick={close}>
    <svg width="23" height="23" viewBox="0 -5 23 26">
      <Path d="M 3 16.5 L 17 2.5" />
      <Path d="M 3 2.5 L 17 16.346" />
    </svg>
  </RemoveBtn>
);

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
