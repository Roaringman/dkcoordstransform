import React, { useRef, useContext } from "react";

//Import context
import { CoordinateContext } from "../../context/CoordinateContext";
import { SRSContext } from "../../context/SRSContext";

//Import components
import CoordinateToTransformSelector from "./CoordinateToTransformSelector";
import TableSidePanel from "./Table-SidePanel";

//Import styles
import {
  OverflowUL,
  Filler,
  BtnContainer,
  InactiveBtn,
} from "./StylesSidePanel/SidePanelElements";

//Import functions
import { fetchAndUpdateCoordinate } from "../../functions/runFetchGenerator";

function SidePanel(props) {
  const { coordinatesToTransform, setCoordinatesToTransform } = useContext(
    CoordinateContext
  );
  const { source, destination } = useContext(SRSContext);

  const { current, send } = props;

  function updatePromises(listOfCoordinates) {
    const updatedCoordiatesToTransform = [];
    listOfCoordinates.map((coordinateData) => {
      send("TRANSFORM");
      return updatedCoordiatesToTransform.push(
        fetchAndUpdateCoordinate(source, destination, coordinateData)
      );
    });
    return updatedCoordiatesToTransform;
  }

  function iterateCoordinates() {
    Promise.all(updatePromises(coordinatesToTransform))
      .then(function (destinationResult) {
        return destinationResult;
      })
      .then(function (withDestination) {
        if (withDestination[0].responseState >= 3) {
          throw new Error(withDestination[0].responseState); //If the response code is not 1 or 2, the whole app enters fail state
        } else {
          setCoordinatesToTransform(withDestination); //Sets the destination coordinates
          const displayResult = Promise.all(updatePromises(withDestination));
          return displayResult;
        }
      })
      .then(function (displayResult) {
        setCoordinatesToTransform(displayResult); //Sets the display coordinates
        send("SUCCESS");
      })
      .catch((error) => {
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
  const ZChecked = useRef(null);

  return (
    <>
      <CoordinateToTransformSelector
        current={current}
        send={send}
        coordinatesToTransform={coordinatesToTransform}
        setCoordinatesToTransform={setCoordinatesToTransform}
        ZChecked={ZChecked}
        iterateCoordinates={iterateCoordinates}
      />
      <OverflowUL>
        <TableSidePanel current={current} ZChecked={ZChecked} />
      </OverflowUL>
    </>
  );
}

export default SidePanel;
