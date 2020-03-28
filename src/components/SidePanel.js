import React from "react";

//Import components
import CoordinateLI from "./CoordinateLI";
import CoordinateToTransformSelecter from "./CoordinateToTransformSelecter";

//Import styles
import {
  OverflowUL,
  BtnContainer,
  ActiveBtn,
  InactiveBtn,
  Table,
  TableHD,
  CenteredH2
} from "../styles/elements";

//Import functions
import runCoordinateTransformGenerator from "../functions/runFetchGenerator";

function SidePanel(props) {
  const {
    current,
    send,
    coordinatesToTransform,
    setCoordinatesToTransform
  } = props;

  const incompatibleSRSError =
    "It is not possible to transform between the selected coordinate systems. Press Reset to choose new settings.";
  const asyncIterator = runCoordinateTransformGenerator([
    send,
    current,
    coordinatesToTransform,
    setCoordinatesToTransform,
    current.context
  ]);

  async function iterateCoordinates() {
    for await (const val of asyncIterator) {
      send("TRANSFORM");

      continue;
    }
    send("SUCCESS");
  }

  return (
    <>
      <CoordinateToTransformSelecter
        current={current}
        send={send}
        coordinatesToTransform={coordinatesToTransform}
        setCoordinatesToTransform={setCoordinatesToTransform}
      />
      <OverflowUL>
        {coordinatesToTransform.length === 0 ? (
          <CenteredH2>Add coordinates to transform</CenteredH2>
        ) : (
          <>
            <Table>
              <tbody>
                <tr>
                  <TableHD> Longitude </TableHD>
                  <TableHD> Latitude </TableHD>
                </tr>
                {coordinatesToTransform.map((coordinates, i) => {
                  return (
                    <CoordinateLI
                      key={i}
                      coordinates={coordinates}
                    ></CoordinateLI>
                  );
                })}
              </tbody>
            </Table>
          </>
        )}
        {current.matches("ready.failedtotransform") ? (
          <p>{incompatibleSRSError}</p>
        ) : null}
      </OverflowUL>
      <BtnContainer>
        {current.matches("ready.active") ? (
          <ActiveBtn onClick={iterateCoordinates}>Transform</ActiveBtn>
        ) : (
          <InactiveBtn> Transform </InactiveBtn>
        )}
        <InactiveBtn> Download Result </InactiveBtn>
      </BtnContainer>
    </>
  );
}

export default SidePanel;
