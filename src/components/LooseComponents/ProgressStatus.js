import React, { useContext, useState } from "react";

// Import components

//Import context
import { CoordinateContext } from "../../context/CoordinateContext";
import { SRSContext } from "../../context/SRSContext";

// Import style
import { FlexRowRightAligned } from "../../styles/elements";
import {
  ProgressItem,
  ProgressIndicator,
  ProgressDescription,
  ProgressContainer,
} from "./StylesLooseComponents/LooseComponentElements";

function ProgressStatus(props) {
  const { current, send, srs } = props;
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
          <ProgressContainer>
            <ProgressDescription>
              Choose spatial reference system
            </ProgressDescription>
          </ProgressContainer>
        )}
        <ProgressItem
          onMouseEnter={() => handleEnter(setProgressOne)}
          onMouseLeave={() => handleLeave(setProgressOne)}
        >
          <ProgressIndicator
            num={1}
            done={
              srs.flat().includes(source) && srs.flat().includes(destination)
                ? true
                : false
            }
          ></ProgressIndicator>
        </ProgressItem>
      </FlexRowRightAligned>
      <FlexRowRightAligned>
        {progressTwo && (
          <ProgressContainer>
            <ProgressDescription>
              Add cordinates to transform
            </ProgressDescription>
          </ProgressContainer>
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
          <ProgressContainer>
            <ProgressDescription>Transform coordinates</ProgressDescription>
          </ProgressContainer>
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
    
    </>
  );
}

export default ProgressStatus;
