import React, { useRef } from "react";
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
import { fetchAndUpdateCoordinate } from "../functions/runFetchGenerator";

function SidePanel(props) {
  const {
    current,
    send,
    coordinatesToTransform,
    setCoordinatesToTransform
  } = props;

  function updatePromises(listOfCoordinates) {
    const updatedCoordiatesToTransform = [];
    listOfCoordinates.map(coordinateData => {
      send("TRANSFORM");
      return updatedCoordiatesToTransform.push(
        fetchAndUpdateCoordinate(
          current.context.sourceSrs,
          current.context.destinationSrs,
          coordinateData
        )
      );
    });
    return updatedCoordiatesToTransform;
  }

  function iterateCoordinates() {
    Promise.all(updatePromises(coordinatesToTransform))
      .then(function(destinationResult) {
        return destinationResult;
      })
      .then(function(withDestination) {
        if (withDestination[0].responseState >= 3) {
          throw new Error(withDestination[0].responseState); //If the response code is not 1 or 2, the whole app enters fail state
        } else {
          setCoordinatesToTransform(withDestination); //Sets the destination coordinates
          const displayResult = Promise.all(updatePromises(withDestination));
          return displayResult;
        }
      })
      .then(function(displayResult) {
        setCoordinatesToTransform(displayResult); //Sets the display coordinates
        send("SUCCESS");
      })
      .catch(error => {
        switch (error.message) {
          case "3":
            current.context.failMessage =
              "CRS's are not compatible across countries. Press the reset button to start over";
            return send("FAILEDTOTRANSFORM");
          default:
            current.context.failMessage =
              "Something unexpected happened. Press the reset button to try again";
            return send("FAILEDTOTRANSFORM");
        }
      });
  }

  const remove = (arr, item) => {
    const newArr = [...arr];
    newArr.splice(
      newArr.findIndex(i => i.id === item),
      1
    );
    if (newArr.length === 0) {
      current.context.coords = false;
    }
    return newArr;
  };

  const ZChecked = useRef(null);

  return (
    <>
      <Filler></Filler>
      <CoordinateToTransformSelecter
        current={current}
        send={send}
        coordinatesToTransform={coordinatesToTransform}
        setCoordinatesToTransform={setCoordinatesToTransform}
        ZChecked={ZChecked}
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
                  {props.current.context.height ? (
                    <TableHD> Height </TableHD>
                  ) : null}
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
                          backgroundColor: "#e46464",
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
                          isHeight={props.current.context.height}
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
          <p>{current.context.failMessage}</p>
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
