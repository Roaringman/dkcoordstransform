import styled from "styled-components";

const darkBLue = "#20639B";
const grayishDark = "#6B7175";
const paleBLue = "#96CEF7";
const lightBlue = "#E0EDF6";
const gray = "#B0BBC2";

const blues = {
  "100": "#F0F4FE",
  "200": "#D4DEF8",
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

export const UIContainer = styled.div`
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 3;
  grid-row-end: 7;
  height: calc(100% - 20px);
  width: calc(100% - 20px);
  margin-left: 20px;
  background-color: ${blues["300"]};
  border-radius: 5px;
  z-index: 3;
  -webkit-box-shadow: 5px 5px 5px -3px rgba(32, 40, 51, 0.3);
  -moz-box-shadow: 5px 5px 5px -3px rgba(32, 40, 51, 0.3);
  box-shadow: 5px 5px 5px -3px rgba(32, 40, 51, 0.3);
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

export const OverflowUL = styled.ul`
  min-height: 50%;
  height: calc(80% - 50px - 20px - 10px);
  overflow: auto;
  width: calc(100% - 20px);
  margin: 10px 0 10px 10px;
  background-color: ${blues["200"]};
  border-radius: 5px;
  z-index: 3;
  box-shadow: inset 5px 5px 5px 0px rgba(0,0,0,1),
  box-shadow: inset -5px -5px 5px 0px rgba(32, 40, 51, 0.3);
`;

export const CoordinateAddForm = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 20%;
  width: 100%;
  margin-buttom: 20px;
`;

export const BtnContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0 10px 10px 10px;
`;

export const ActiveBtn = styled.button`
  postion: relative;
  width: 40%;
  min-width: 100px;
  height: 50px;
  border: none;
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
  border: none;
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
  margin-bottom: 30px;
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

export const InputTableRow = styled.tr`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

// SRS TRANSFORM COMPONENT STYLES

export const TransformSelectContainer = styled.div`
  grid-column-start: 1;
  grid-column-end: 12;
  grid-row-start: 2;
  grid-row-end: 3;
  background-color: ${blues["400"]};
  z-index: 3;
  padding-top: 20px;
`;

export const TransformSelectGrid = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(11, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 20px;
  align-items: end;
`;

export const SrsTitle = styled.h1`
  font-size: 4rem;
  letter-spacing: 5px;
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 1;
  text-align: right;
  color: ${grays["100"]};
`;

export const SrsLabel = styled.label`
  height: 100%;
  align-self: end;
  font-size: 4rem;
  grid-row-start: 1;
  grid-row-end: 2;
  color: ${grays["100"]};
`;

export const SrsSelect = styled.select`
  grid-row-start: 2;
  grid-row-end: 3;
  width: 100%;
  height: 100%;
  font-size: 1rem;
  text-align: center;
  background-color: ${grays["200"]};
  color: ${grays["800"]};
  border-radius: 5px;
  font-family: "Overpass", sans-serif;
`;
export const SrsFrom = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: repeat(2, 1fr);
  grid-column-start: 5;
  grid-column-end: 7;
  grid-row-start: 1;
  grid-row-end: 3;
`;
export const SrsTo = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: repeat(2, 1fr);
  grid-row-start: 1;
  grid-row-end: 3;
  grid-column-start: 7;
  grid-column-end: 9;
`;
