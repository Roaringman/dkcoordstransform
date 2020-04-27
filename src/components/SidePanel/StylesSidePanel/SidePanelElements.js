import styled from "styled-components";
import * as React from "react";
import { motion } from "framer-motion";

import {
  blues,
  grays,
  breakpoints,
  OrangeAccent,
} from "../../../styles/elements";

export const CenteredH2 = styled.h2`
  width: 100%;
  color: ${grays["500"]};
  font-size: 1.3rem;
  margin-top: 2rem;
  text-align: center;
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

export const OverflowUL = styled.section`
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 7;
  overflow: auto;
  overflow-x: auto;
  background-color: ${blues["100"]};
  z-index: 3;
  margin-bottom: 20px;
  width: 100%;

  @media (max-width: ${breakpoints.small}px) {
    border-radius: 0;
    grid-column-start: 1;
    grid-column-end: 12;
    box-shadow: inset 0 6px 4px -4px rgba(0, 0, 0, 0.7),
      inset 0 -6px 4px -4px rgba(0, 0, 0, 0.7);
  }
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

export const TableTD = styled.td`
  padding: 0 10px;
  width: 18ch;
  vertical-align: middle;
`;

export const CoordinateAddForm = styled.div`
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 2;
  height: 200px;
  display: flex;
  justify-content: center;
  min-width: 125px;

  @media (max-width: ${breakpoints.small}px) {
    grid-column-start: 1;
    grid-column-end: 12;
    min-height: 170px;
  }
`;

export const CoordinateFormSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-self: flex-start;
`;

export const FailMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  hyphon: auto;
  margin: 20px;
`;

export const Paragraph = styled.p`
  color: ${grays["800"]};
  margin-bottom: 20px;
`;

export const CoordinateForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  width: 50%;
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

export const UlFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  list-style-type: none;
`;

export const ActiveBtn = styled(motion.button)`
  postion: relative;
  width: 10ch;
  min-width: 140px;
  height: 2.3rem;
  width: 50%;
  border: none;
  color: ${grays["100"]};
  background-color: #${OrangeAccent};
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
  height: 2.3rem;
  width: 50%;
  border: 2px;
  border-style: solid;
  border-color: ${grays["500"]};
  background-color: ${grays["200"]};
  color: ${grays["500"]};
  border-radius: 5px;
  padding: 0;
`;

// TABLE STUFF

export const Table = styled.table`
  min-width: 100%;
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
