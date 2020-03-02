import React from "react";
import SrsOptions from "./srsOptions";

function SourceDestinationSelecter(props) {
  let { source, destination, setSource, setDestination, srs } = props;

  return (
    <>
      <label htmlFor="source-select"> </label>
      You are converting from
      <select id="source-select" onChange={e => setSource(e.target.value)}>
        <option value={source}>{source}</option>
        {srs.map(srs => {
          if (typeof srs !== "string") {
            return <SrsOptions key={`${srs}-source`} srs={srs}></SrsOptions>;
          } else {
            return <optgroup key={`${srs}-source`} label={srs}></optgroup>;
          }
        })}
      </select>
      <label htmlFor="destination-select">
        to
        <select
          id="destination-select"
          onChange={e => setDestination(e.target.value)}
        >
          <option value={destination}>{destination}</option>
          {srs.map(srs => {
            if (typeof srs !== "string") {
              return <SrsOptions key={`${srs}-dest`} srs={srs}></SrsOptions>;
            } else {
              return <optgroup key={`${srs}-dest`} label={srs}></optgroup>;
            }
          })}
        </select>
      </label>
    </>
  );
}

export default SourceDestinationSelecter;