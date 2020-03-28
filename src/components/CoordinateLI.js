import React from "react";

//Import styles
import { TableTD, TableRow } from "../styles/elements";

function CoordinateLI(props) {
  const { coordinates } = props;

  switch (true) {
    case coordinates.destinationCoords && coordinates.responseState === 1:
      return (
        <TableRow>
          <TableTD>{coordinates.destinationCoords[0]}</TableTD>
          <TableTD>{coordinates.destinationCoords[1]}</TableTD>
        </TableRow>
      );
    case coordinates.destinationCoords &&
      coordinates.destinationCoords[0] !== null:
      return (
        <TableRow>
          <TableTD>{coordinates.destinationCoords[0]}</TableTD>
          <TableTD>{coordinates.destinationCoords[1]}</TableTD>
        </TableRow>
      );
    case coordinates.destinationCoords && coordinates.responseState === 2:
      return (
        <TableRow>
          <li>{`Coordinates out of bounds`}</li>
        </TableRow>
      );
    default:
      return (
        <TableRow>
          <TableTD>{coordinates.sourceCoords[0]}</TableTD>
          <TableTD>{coordinates.sourceCoords[1]}</TableTD>
        </TableRow>
      );
  }
}

export default CoordinateLI;
