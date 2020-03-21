import React from "react";

function CoordinateLI(props) {
  const { coordinates } = props;

  if (coordinates.destinationCoords) {
    return (
      <li>
        {coordinates.responseState === 1
          ? `${coordinates.destinationCoords[0]}, ${coordinates.destinationCoords[1]}`
          : coordinates.destinationCoords[0] !== null
          ? `${coordinates.destinationCoords[0]}, ${coordinates.destinationCoords[1]}`
          : `Coordinates out of bounds`}
      </li>
    );
  } else {
    return (
      <li>{`${coordinates.sourceCoords[0]}, ${coordinates.sourceCoords[1]}`}</li>
    );
  }
}

export default CoordinateLI;
