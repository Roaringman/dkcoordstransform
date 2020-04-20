import React, { useState, createContext } from "react";

export const RefContext = createContext();

export const RefProvider = (props) => {
  const [destinationRef, setDestinationRef] = useState(null);
  const [sourceRef, setSourceRef] = useState(null);

  return (
    <RefContext.Provider
      value={{ destinationRef, setDestinationRef, sourceRef, setSourceRef }}
    >
      {props.children}
    </RefContext.Provider>
  );
};
