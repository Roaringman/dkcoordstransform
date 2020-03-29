import React from "react";

//Import styles
import { TableTD } from "../styles/elements";

function CoordinateLI(props) {
  const { coordinates, isHeight } = props;

  switch (true) {
    case coordinates.destinationCoords && coordinates.responseState === 1:
      return (
        <>
          <TableTD>{coordinates.destinationCoords[0]}</TableTD>
          <TableTD>{coordinates.destinationCoords[1]}</TableTD>
          {isHeight ? (
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
          {isHeight ? (
            <TableTD>{coordinates.destinationCoords[2]}</TableTD>
          ) : null}
        </>
      );
    case coordinates.destinationCoords && coordinates.responseState === 2:
      return (
        <>
          <li>{`Coordinates out of bounds`}</li>
        </>
      );
    default:
      return (
        <>
          <TableTD>{coordinates.sourceCoords[0]}</TableTD>
          <TableTD>{coordinates.sourceCoords[1]}</TableTD>
          {isHeight ? <TableTD>{coordinates.sourceCoords[2]}</TableTD> : null}
        </>
      );
  }
}

export default CoordinateLI;
