import React, { useState } from "react";

//Import styles
import {
  SRSInfoBoxPopUp,
  SRSInfoBoxText,
  SRSInfoBoxArrow
} from "../styles/elements";

function SRSInfoBox(props) {
  const [isToggled, toggle] = useState(false);
  const { data } = props;
  function handleToggle() {
    return toggle(!isToggled);
  }

  switch (isToggled) {
    case true:
      return (
        <>
          <SRSInfoBoxPopUp>
            <SRSInfoBoxText>
              <ul>
                {Object.entries(data).map((value, key) => {
                  console.log(value);
                  return <li key={key}>{`${value[0]}: ${value[1]}`}</li>;
                })}
              </ul>
            </SRSInfoBoxText>
            <SRSInfoBoxArrow />
          </SRSInfoBoxPopUp>
          <button onClick={handleToggle}>!</button>
        </>
      );
    case false:
      return <button onClick={handleToggle}>?</button>;

    default:
      return <button onClick={handleToggle}>?</button>;
  }
}

export default SRSInfoBox;
