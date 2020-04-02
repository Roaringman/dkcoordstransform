import React, { useContext } from "react";
import { ResetBtn, ResetBtnHighlight } from "../styles/elements";

//Import context
import { CoordinateContext } from "../context/CoordinateContext";

function ResetButton(props) {
  const { send, current, setSource, setDestination } = props;
  const [coordinatesToTransform, setCoordinatesToTransform] = useContext(
    CoordinateContext
  );

  function handleSend() {
    send("RESET");
    setSource("--Please choose an option--");
    setDestination("--Please choose an option--");
    setCoordinatesToTransform([]);
  }

  switch (true) {
    case current.matches("ready.failedtotransform"):
      return <ResetBtnHighlight onClick={handleSend}>Reset</ResetBtnHighlight>;
    default:
      return <ResetBtn onClick={handleSend}>Reset</ResetBtn>;
  }
}

export default ResetButton;
