import React, { useState } from "react";

// Import utils
import { dictionary } from "../utils/dictionary";

// Import styles
import {
  SRSInfoBoxPopUp,
  SRSInfoBoxText,
  SRSInfoBoxArrow,
} from "../styles/elements";

function SRSInfoBox(props) {
  const { isSRSSelected, data } = props;
  const [isToggled, toggle] = useState(false);

  function handleToggle() {
    return toggle(!isToggled);
  }

  switch (isToggled && isSRSSelected) {
    case true:
      return (
        <>
          <SRSInfoBoxPopUp>
            <SRSInfoBoxText>
              <ul>
                {Object.entries(data).map((value, key) => {
                  if (value[0] === "Title") {
                    return <h3 key={`key-${key}`}>{value[1]}</h3>;
                  } else {
                    return (
                      <li key={`info-${key}`}>
                        {value[1] && // If z-component is defined
                          `${value[0]}: ${dictionary[value[1].toLowerCase()]}`}
                      </li>
                    );
                  }
                })}
              </ul>
            </SRSInfoBoxText>
            <SRSInfoBoxArrow />
          </SRSInfoBoxPopUp>
          <button onClick={handleToggle}>!</button>
        </>
      );
    case false:
      return (
        <button onClick={handleToggle} disabled={!isSRSSelected}>
          ?
        </button>
      );

    default:
      return (
        <button onClick={handleToggle} disabled={!isSRSSelected}>
          ?
        </button>
      );
  }
}

export default SRSInfoBox;
