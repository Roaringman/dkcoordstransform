import React from "react";
import SrsOptions from "./srsOptions";
import {
  SrsFrom,
  SrsTo,
  SrsSelect,
  SrsTitle,
  SrsLabel
} from "../styles/elements";

function SourceDestinationSelecter(props) {
  let {
    source,
    destination,
    setSource,
    setDestination,
    srs,
    machineContext,
    send,
    current
  } = props;

  return (
    <>
      <SrsTitle>Transform</SrsTitle>

      <SrsFrom>
        <SrsLabel htmlFor="source-select">From</SrsLabel>
        <SrsSelect
          id="source-select"
          onChange={e => {
            setSource(e.target.value);
            machineContext.sourceSrs = e.target.value;

            if (current.matches("ready.allinactive")) {
              send("READYTOTRANSFORM");
              console.log(current.value);
            }
          }}
        >
          <option value={source}>{source}</option>
          {srs.map(srs => {
            if (typeof srs !== "string") {
              return <SrsOptions key={`${srs}-source`} srs={srs}></SrsOptions>;
            } else {
              return <optgroup key={`${srs}-source`} label={srs}></optgroup>;
            }
          })}
        </SrsSelect>
      </SrsFrom>

      <SrsTo>
        <SrsLabel htmlFor="destination-select">To</SrsLabel>
        <SrsSelect
          id="destination-select"
          onChange={e => {
            setDestination(e.target.value);
            machineContext.destinationSrs = e.target.value;
            if (current.matches("ready.allinactive")) {
              send("READYTOTRANSFORM");
              console.log(current.value);
            }
          }}
        >
          <option value={destination}>{destination}</option>
          {srs.map(srs => {
            if (typeof srs !== "string") {
              return <SrsOptions key={`${srs}-dest`} srs={srs}></SrsOptions>;
            } else {
              return <optgroup key={`${srs}-dest`} label={srs}></optgroup>;
            }
          })}
        </SrsSelect>
      </SrsTo>
    </>
  );
}

export default SourceDestinationSelecter;
