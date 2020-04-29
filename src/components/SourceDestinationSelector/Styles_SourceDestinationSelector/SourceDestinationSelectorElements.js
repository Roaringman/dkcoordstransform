import styled from "styled-components";

import {
  blues,
  grays,
  breakpoints,
  OrangeAccent,
} from "../../../styles/elements";

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
    font-size: 3rem;
    margin: 0 10px 5px;
    align-items: flex-end;
  }

  @media (max-width: ${breakpoints.small}px) {
    color: ${grays["100"]};
    margin: 0 10px;
    font-size: 2rem;
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
    width: 20ch;
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

    margin: 20px 0;
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
