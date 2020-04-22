import React, { useContext, useState } from "react";

// Import components
import ResetButton from "./ResetButton";

//Import context
import { CoordinateContext } from "../../context/CoordinateContext";
import { SRSContext } from "../../context/SRSContext";

// Import style
import { FlexRowRightAligned } from "../../styles/elements";
import {
  ProgressItem,
  ProgressIndicator,
  ProgressDescription,
} from "./StylesLooseComponents/LooseComponentElements";

function ProgressStatus(props) {
  const { current, send } = props;
  const { coordinatesToTransform } = useContext(CoordinateContext);
  const { source, destination } = useContext(SRSContext);
  const [progressOne, setProgressOne] = useState(false);
  const [progressTwo, setProgressTwo] = useState(false);
  const [progressThree, setProgressThree] = useState(false);

  function handleEnter(setProgress) {
    setProgress(true);
  }

  function handleLeave(setProgress) {
    setProgress(false);
  }

  return (
    <>
      <FlexRowRightAligned>
        {progressOne && (
          <ProgressDescription>
            Choose spatial reference system
          </ProgressDescription>
        )}
        <ProgressItem
          onMouseEnter={() => handleEnter(setProgressOne)}
          onMouseLeave={() => handleLeave(setProgressOne)}
        >
          <ProgressIndicator
            num={1}
            done={source && destination ? true : false}
          ></ProgressIndicator>
        </ProgressItem>
      </FlexRowRightAligned>
      <FlexRowRightAligned>
        {progressTwo && (
          <ProgressDescription>Add cordinates to transform</ProgressDescription>
        )}
        <ProgressItem
          onMouseEnter={() => handleEnter(setProgressTwo)}
          onMouseLeave={() => handleLeave(setProgressTwo)}
        >
          <ProgressIndicator
            num={2}
            done={coordinatesToTransform.length >= 1 ? true : false}
          ></ProgressIndicator>
        </ProgressItem>
      </FlexRowRightAligned>
      <FlexRowRightAligned>
        {progressThree && (
          <ProgressDescription>Transform coordinates</ProgressDescription>
        )}
        <ProgressItem
          onMouseEnter={() => handleEnter(setProgressThree)}
          onMouseLeave={() => handleLeave(setProgressThree)}
        >
          <ProgressIndicator
            num={3}
            done={current.matches("ready.transformed")}
          ></ProgressIndicator>
        </ProgressItem>
      </FlexRowRightAligned>
      <FlexRowRightAligned>
        <ResetButton current={current} send={send}></ResetButton>
      </FlexRowRightAligned>
    </>
  );
}

export default ProgressStatus;
