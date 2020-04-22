import React from "react";

//Import styles
import { TableTD } from "./StylesSidePanel/SidePanelElements";

function CoordinateLI(props) {
  const { coordinates, ZChecked } = props;

  switch (true) {
    case coordinates.destinationCoords && coordinates.responseState === 1:
      return (
        <>
          <TableTD>{coordinates.destinationCoords[0]}</TableTD>
          <TableTD>{coordinates.destinationCoords[1]}</TableTD>
          {ZChecked ? (
            <TableTD>{coordinates.destinationCoords[2]}</TableTD>
          ) : null}
        </>
      );
    case coordinates.destinationCoords &&
      coordinates.destinationCoords[0] !== null:
      return (
        <>
          <TableTD>{coordinates.destinationCoords[0]}</TableTD>
          <TableTD>{coordinates.destinationCoords[1]}</TableTD>
          {ZChecked ? (
            <TableTD>{coordinates.destinationCoords[2]}</TableTD>
          ) : null}
        </>
      );
    case coordinates.responseState === 2:
      return (
        <>
          <td colspan={4}>{`Coordinates out of bounds`}</td>
        </>
      );
    default:
      return (
        <>
          <TableTD>{coordinates.sourceCoords[0]}</TableTD>
          <TableTD>{coordinates.sourceCoords[1]}</TableTD>
          {ZChecked ? <TableTD>{coordinates.sourceCoords[2]}</TableTD> : null}
        </>
      );
  }
}

export default CoordinateLI;
