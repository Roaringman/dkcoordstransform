import styled from "styled-components";

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
export const TransparentBlack = "#00000080";

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

export const FlexColumnCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 4rem;
  @media (max-width: ${breakpoints.medium}px) {
    height: 4rem;
  }
`;

export const TransformSelectContainer = styled.section`
  position: absolute;
  width: 100vw;
  height: 135px;
  top: 115px;
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
  width: 465px;
  min-width: 345px;
  background-color: ${grays["200"]};
  z-index: 3;
  overflow-x: hidden;
  overflow-y: auto;
  @media (max-width: ${breakpoints.small}px) {
    grid-column-start: 1;
    grid-column-end: 12;
    min-width: 100%;
    height: 100vh;
    overflow: auto;
    background-color: ${blues["300"]};
  }
`;

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

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const FlexRowRightAligned = styled(FlexRow)`
  justify-content: flex-end;
`;
