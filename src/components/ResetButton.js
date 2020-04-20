import React, { useContext } from "react";
import { ResetBtn, ResetBtnHighlight } from "../styles/elements";

//Import context
import { CoordinateContext } from "../context/CoordinateContext";
import { SRSContext } from "../context/SRSContext";
import { RefContext } from "../context/RefContext";

function ResetButton(props) {
  const { send, current } = props;
  const { setCoordinatesToTransform } = useContext(CoordinateContext);
  const {
    setSource,
    setDestination,
    setSourceData,
    setDestinationData,
  } = useContext(SRSContext);

  const { sourceRef, destinationRef } = useContext(RefContext);

  function handleSend() {
    console.log(sourceRef.current);
    send("RESET");
    setSource(null);
    setDestination(null);
    setCoordinatesToTransform([]);
    setSourceData({});
    setDestinationData({});
    sourceRef.current.value = "NUUU";
  }

  switch (true) {
    case current.matches("ready.failedtotransform"):
      return <ResetBtnHighlight onClick={handleSend}>Reset</ResetBtnHighlight>;
    default:
      return <ResetBtn onClick={handleSend}>Reset</ResetBtn>;
  }
}

export default ResetButton;
