import React, { useState, createContext } from "react";

export const CoordinateContext = createContext();

export const CoordinateProvider = (props) => {
  const [coordinatesToTransform, setCoordinatesToTransform] = useState([]);

  return (
    <CoordinateContext.Provider
      value={{ coordinatesToTransform, setCoordinatesToTransform }}
    >
      {props.children}
    </CoordinateContext.Provider>
  );
};
