import React, { useState, createContext } from "react";

export const SRSContext = createContext();

export const SRSProvider = props => {
  const [source, setSource] = useState("--Please choose an option--");
  const [destination, setDestination] = useState("--Please choose an option--");
  const [sourceData, setSourceData] = useState({});
  const [destinationData, setDestinationData] = useState({});

  return (
    <SRSContext.Provider
      value={{
        source,
        setSource,
        destination,
        setDestination,
        sourceData,
        setSourceData,
        destinationData,
        setDestinationData
      }}
    >
      {props.children}
    </SRSContext.Provider>
  );
};
