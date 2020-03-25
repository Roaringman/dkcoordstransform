import React from "react";
import { ProgressItem } from "../styles/elements";

function ProgressStatus(props) {
  const context = props.current.context;

  return (
    <>
      <ProgressItem>
        {context.sourceSrs && context.destinationSrs !== ""
          ? "Done"
          : "Choose spatial reference systems"}
      </ProgressItem>
      <ProgressItem>
        {context.coords.length > 0 ? "Done" : "Add coordinates to transform"}
      </ProgressItem>
      <ProgressItem>
        {props.current.matches("ready.transformed")
          ? "Done"
          : "Transform coordinates"}
      </ProgressItem>
    </>
  );
}

export default ProgressStatus;
