import React, { useState, createContext } from "react";

export const SRSContext = createContext();

export const SRSProvider = (props) => {
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
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
        setDestinationData,
      }}
    >
      {props.children}
    </SRSContext.Provider>
  );
};
