import React, { useState } from "react";

// Import utils
import { dictionary } from "../../utils/dictionary";

// Import styles
import {
  SRSInfoBoxPopUp,
  SRSInfoBoxText,
  SRSInfoBoxArrow,
  SRSInfoButton,
} from "./StylesLooseComponents/LooseComponentElements";

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
            <SRSInfoButton onClick={handleToggle}>!</SRSInfoButton>
          <SRSInfoBoxPopUp>
          <SRSInfoBoxArrow />
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
           
          </SRSInfoBoxPopUp>
       
        </>
      );
    case false:
      return (
        <SRSInfoButton onClick={handleToggle} disabled={!isSRSSelected}>
          ?
        </SRSInfoButton>
      );

    default:
      return (
        <SRSInfoButton onClick={handleToggle} disabled={!isSRSSelected}>
          ?
        </SRSInfoButton>
      );
  }
}

export default SRSInfoBox;
