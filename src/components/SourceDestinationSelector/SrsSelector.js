import React from "react";

// Import utils
import { dictionary } from "../../utils/dictionary";

// Import functions
import SrsOptions from "./srsOptions";
import { getSRSData } from "../../functions/fetching";

// Import styles
import { SrsSelect } from "./Styles_SourceDestinationSelector/SourceDestinationSelectorElements";

function SrsSelector(props) {
  let {
    srs,
    send,
    current,
    target,
    targetName,
    setTargetData,
    setTarget,
  } = props;

  return (
    <SrsSelect
      key={`${target}`}
      id={`${target}-select`}
      disabled={
        current.matches("ready.transformed") ||
        current.matches("ready.failedToTransform")
      }
      onChange={(e) => {
        const value = e.target.value;
        current.context[`${targetName}Srs`] = value;
        setTarget(value);
        getSRSData(srs, value, setTargetData);
        if (current.matches("ready.allinactive")) {
          send("READYTOTRANSFORM");
        }
      }}
    >
      <option value={target}>{target}</option>
      {srs.map((srs) => {
        if (typeof srs !== "string") {
          return (
            <SrsOptions key={`${srs}-${targetName}`} srs={srs}></SrsOptions>
          );
        } else {
          return (
            <optgroup
              key={`${srs}-${targetName}`}
              label={dictionary[srs.toLowerCase()]} // Translate GL to Greenland and DK to Denmark
            ></optgroup>
          );
        }
      })}
    </SrsSelect>
  );
}

export default SrsSelector;
