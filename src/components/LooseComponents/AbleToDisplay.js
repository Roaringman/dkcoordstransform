import React, { useContext } from "react";

//Import context
import { CoordinateContext } from "../../context/CoordinateContext";

// Import style
import { DisplayCoordinatesInfo } from "./StylesLooseComponents/LooseComponentElements";

export function AbleToDisplay(props) {
  const { current } = props;
  const { coordinatesToTransform } = useContext(CoordinateContext);

  const filterDisplayed = coordinatesToTransform.filter(
    (coordinate) => coordinate.displayCoords !== null
  );

  switch (true) {
    case current.matches("ready.transformed") && filterDisplayed.length === 0:
      return (
        <DisplayCoordinatesInfo>
          <p>Could not display any coordinates</p>
        </DisplayCoordinatesInfo>
      );

    case current.matches("ready.allinactive"):
      return (
        <DisplayCoordinatesInfo>
          <p>Transform coordinates to display them on the map</p>
        </DisplayCoordinatesInfo>
      );

    default:
      return null;
  }
}

export default AbleToDisplay;
