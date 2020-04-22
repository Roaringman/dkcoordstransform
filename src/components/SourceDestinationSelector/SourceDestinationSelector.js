import React, { useContext, useRef, useEffect } from "react";

// Import components
import SRSInfoBox from "../LooseComponents/SRSInfoBox";
import SrsSelector from "./SrsSelector";

// Import styles
import {
  SrsFrom,
  SrsTo,
  SrsTitle,
  SrsLabel,
  SrsTitleBackground,
  SrsFormContainer,
} from "./Styles_SourceDestinationSelector/SourceDestinationSelectorElements";
import { FlexColumnCenter } from "../../styles/elements";

//Import context
import { SRSContext } from "../../context/SRSContext";
import { RefContext } from "../../context/RefContext";

function SourceDestinationSelector(props) {
  const { srs, current, send } = props;

  const {
    source,
    destination,
    sourceData,
    destinationData,
    setSource,
    setDestination,
    setSourceData,
    setDestinationData,
  } = useContext(SRSContext);

  const { setSourceRef, setDestinationRef } = useContext(RefContext);
  const sourceRef = useRef(null);

  useEffect(() => {
    setSourceRef(sourceRef);
    setDestinationRef(setDestinationRef);
  }, [setSourceRef, setDestinationRef]);

  return (
    <>
      <SrsTitleBackground>
        <SrsTitle>Transform</SrsTitle>
      </SrsTitleBackground>

      <SrsFormContainer>
        <SrsFrom>
          <SrsLabel htmlFor="source-select">From</SrsLabel>
          <FlexColumnCenter>
            <SRSInfoBox
              isSRSSelected={srs.flat().includes(source)}
              data={sourceData}
            />
            <SrsSelector
              srs={srs}
              send={send}
              current={current}
              target={source}
              targetName={"source"}
              setTargetData={setSourceData}
              setTarget={setSource}
              machineContext={current.context.sourceSrs}
            />
          </FlexColumnCenter>
        </SrsFrom>

        <SrsTo>
          <SrsLabel htmlFor="destination-select">To</SrsLabel>
          <FlexColumnCenter>
            <SRSInfoBox
              isSRSSelected={srs.flat().includes(destination)}
              data={destinationData}
            />
            <SrsSelector
              srs={srs}
              send={send}
              current={current}
              target={destination}
              targetName={"destination"}
              setTargetData={setDestinationData}
              setTarget={setDestination}
              machineContext={current.context.destinationSrs}
            />
          </FlexColumnCenter>
        </SrsTo>
      </SrsFormContainer>
    </>
  );
}

export default SourceDestinationSelector;
