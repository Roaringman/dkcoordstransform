import React from "react";
import { AnimatePresence } from "framer-motion";

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
  CenteredH2,
  Filler,
  CloseButton,
  TableRow,
  RemoveRowH
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

  const remove = (arr, item) => {
    const newArr = [...arr];
    newArr.splice(
      newArr.findIndex(i => i.id === item),
      1
    );
    return newArr;
  };

  return (
    <>
      <Filler></Filler>
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
                  <RemoveRowH> </RemoveRowH>
                  <TableHD> Longitude </TableHD>
                  <TableHD> Latitude </TableHD>
                </tr>
                <AnimatePresence initial={true}>
                  {coordinatesToTransform.map((coordinates, i) => {
                    return (
                      <TableRow
                        key={coordinates.id}
                        positionTransition
                        initial={{ y: -50 }}
                        animate={{ y: 0 }}
                        exit={{
                          opacity: 0,
                          x: -50,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <CloseButton
                          close={() =>
                            setCoordinatesToTransform(
                              remove(coordinatesToTransform, coordinates.id)
                            )
                          }
                        ></CloseButton>
                        <CoordinateLI
                          key={i}
                          coordinates={coordinates}
                        ></CoordinateLI>
                      </TableRow>
                    );
                  })}
                </AnimatePresence>
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
