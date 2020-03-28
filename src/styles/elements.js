import styled from "styled-components";

/*const darkBLue = "#20639B";
const grayishDark = "#6B7175";
const paleBLue = "#96CEF7";
const lightBlue = "#E0EDF6";
const gray = "#B0BBC2";*/

const blues = {
  "100": "#F0F4FE",
  "200": "#6B90A9", //"#D4DEF8",
  "300": "#95AEED",
  "400": "#758CE0",
  "500": "#6175DE",
  "600": "#495DC6",
  "700": "#3547A4",
  "800": "#253586",
  "900": "#1F2C6D"
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
  "900": "#202833"
};

export const Title = styled.h1`
  position: relative;
  z-index: 3;
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

export const StatusContainer = styled.div`
  grid-column-start: 11;
  grid-column-end: 12;
  grid-row-start: 3;
  grid-row-end: 6;
  background-color: ${blues["300"]};
  z-index: 3;
`;

export const ProgressItem = styled.div`
  position: relative;
  background-color: ${blues["300"]};
  height: 25%;
  width: 100%;
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
`;

export const ActiveBtn = styled.button`
  postion: relative;
  width: 40%;
  min-width: 100px;
  height: 50px;
  border: 1px;
  border-style: solid;
  background-color: #fce8e8;
  border-radius: 5px;
  padding: 0;
  &:hover {
    background-color: #e46464;
  }
`;

export const InactiveBtn = styled.button`
  postion: relative;
  width: 40%;
  min-width: 100px;
  height: 50px;
  border: 1px;

  background-color: ${grays["200"]};
  color: ${grays["500"]};
  border-radius: 5px;
  padding: 0;
`;

export const ResetBtn = styled.button`
  grid-column-start: 4;
  grid-column-end: 5;
  grid-row-start: 6;
  grid-row-end: 7;
  align-self: end;
  width: 100%;
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
`;

export const ResetBtnHighlight = styled(ResetBtn)`
  background-color: rgba(116, 217, 159, 0.8);
  color: ${grays["100"]};
`;

// SRS TRANSFORM COMPONENT STYLES
export const Filler = styled.div`
  grid-row-start: 2;
  grid-row-end: 3;
  grid-column-start: 1;
  grid-column-end: 4;
  background-color: ${grays["200"]};
  height: 135px;
`;

export const TransformSelectContainer = styled.section`
  grid-column-start: 1;
  grid-column-end: 12;
  grid-row-start: 2;
  grid-row-end: 3;
  background-color: ${grays["200"]};
  z-index: 4;
  @media (max-width: 875px) {
    grid-row-start: 1;
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

  @media (max-width: 875px) {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
`;

export const SrsTitleBackground = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 3;
  height: 135px;
  width: 100%;
  min-width: 345px;
  background-color: ${blues["500"]};

  @media (max-width: 875px) {
    justify-content: start;
  }
`;

export const SrsTitle = styled.h1`
  font-size: 4rem;
  letter-spacing: 5px;
  text-align: right;
  color: ${grays["100"]};
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
  @media (max-width: 1150px) {
    font-size: 2rem;
    margin: 0 10px;
  }
`;

export const SrsSelect = styled.select`
  font-size: 1rem;
  text-align: center;
  background-color: ${blues["100"]};
  color: ${grays["800"]};
  border-radius: 5px;
  font-family: "Overpass", sans-serif;

  @media (max-width: 1150px) {
    height: 2rem;
    font-size: 0.8rem;
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

  @media (max-width: 1150px) {
    grid-column-start: 5;
    grid-column-end: 12;
  }

  @media (max-width: 875px) {
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
  }
`;

export const SrsFrom = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  @media (max-width: 875px) {
    justify-content: space-between;
    align-items: end;
  }
`;
export const SrsTo = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  @media (max-width: 875px) {
    justify-content: space-between;
    align-items: end;
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
  border-radius: 5px;
  z-index: 3;
`;

export const CoordinateAddForm = styled.div`
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 3;
  grid-row-end: 4;
`;

export const UIContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 7;
  height: 100%;
  width: 100%;
  min-width: 345px;
  background-color: ${grays["200"]};
  z-index: 3;
`;

export const CenteredH2 = styled.h2`
  width: 100%;
  color: ${grays["500"]};
  font-size: 1.3rem;
  margin-top: 2rem;
  text-align: center;
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
  background-color: ${blues["600"]};
`;

export const TableRow = styled.tr`
  height: 1.5rem;
  text-align: right;
  &:nth-child(odd) {
    background-color: ${blues["300"]};
  }
`;

export const InputTableRow = styled.tr`
  display: flex;
`;

export const TableInput = styled.input`
  width: 98%;
`;

export const CoordinateComponentsTable = styled.table`
  width: 100%;
`;

export const CoordinateComponentsTableRowData = styled.table`
  width: 1fr;
`;
