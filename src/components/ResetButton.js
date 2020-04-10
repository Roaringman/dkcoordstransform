import React, { useContext } from "react";
import { ResetBtn, ResetBtnHighlight } from "../styles/elements";

//Import context
import { CoordinateContext } from "../context/CoordinateContext";
import { SRSContext } from "../context/SRSContext";

function ResetButton(props) {
  const { send, current } = props;
  const [coordinatesToTransform, setCoordinatesToTransform] = useContext(
    CoordinateContext
  );
  const { source, setSource, setDestination } = useContext(SRSContext);

  function handleSend() {
    send("RESET");
    setSource("--Please choose an option--");
    setDestination("--Please choose an option--");
    setCoordinatesToTransform([]);
    console.log(source);
  }

  switch (true) {
    case current.matches("ready.failedtotransform"):
      return <ResetBtnHighlight onClick={handleSend}>Reset</ResetBtnHighlight>;
    default:
      return <ResetBtn onClick={handleSend}>Reset</ResetBtn>;
  }
}

export default ResetButton;
