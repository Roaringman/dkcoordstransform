import React, { useState, createContext } from "react";

export const SRSContext = createContext();

export const SRSProvider = (props) => {
  const [source, setSource] = useState("Source Reference");
  const [destination, setDestination] = useState("Destination Reference");
  const [sourceData, setSourceData] = useState(false);
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
