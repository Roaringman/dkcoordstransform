import React from "react";
function SrsOptions(props) {
  const spatialReferenceSystems = props.srs;

  return spatialReferenceSystems.map(srs => {
    return <option key={`${srs}`} value={`${srs}`}>{`${srs}`}</option>;
  });
}

export default SrsOptions;
