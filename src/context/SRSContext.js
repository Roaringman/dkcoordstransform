import React, { useState, createContext } from "react";

export const SRSContext = createContext();

export const SRSProvider = props => {
  const [source, setSource] = useState("--Please choose an option--");
  const [destination, setDestination] = useState("--Please choose an option--");

  return (
    <SRSContext.Provider
      value={[source, setSource, destination, setDestination]}
    >
      {props.children}
    </SRSContext.Provider>
  );
};
