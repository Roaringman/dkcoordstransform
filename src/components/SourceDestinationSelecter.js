import React, { useContext, useRef, useEffect } from "react";

// Import utils
import { dictionary } from "../utils/dictionary";

// Import functions
import SrsOptions from "./srsOptions";

// Import components
import SRSInfoBox from "./SRSInfoBox";

// Import styles
import {
  SrsFrom,
  SrsTo,
  SrsSelect,
  SrsTitle,
  SrsLabel,
  SrsTitleBackground,
  SrsFormContainer,
  FlexColumnCenter,
} from "../styles/elements";

//Import context
import { SRSContext } from "../context/SRSContext";
import { RefContext } from "../context/RefContext";

function SourceDestinationSelecter(props) {
  const {
    source,
    setSource,
    destination,
    setDestination,
    sourceData,
    setSourceData,
    destinationData,
    setDestinationData,
  } = useContext(SRSContext);

  const { setSourceRef, setDestinationRef } = useContext(RefContext);
  const sourceRef = useRef(null);
  const destinationRef = useRef(null);

  useEffect(() => {
    setSourceRef(sourceRef);
    setDestinationRef(setDestinationRef);
  }, []);

  let { srs, machineContext, send, current } = props;

  function getSRSData(target, setData) {
    if (srs.flat().includes(target)) {
      fetch(
        `https://services.kortforsyningen.dk/rest/webproj/v1.0/crs/${target}?token=8336526c09097038d0436ba18e95153b`
      )
        .then((response) => response.json())
        .then((dataJson) => {
          const filteredData = {
            Title: dataJson.title,
            Coverage: dataJson.country,
            X: dataJson.v1,
            Y: dataJson.v2,
            Z: dataJson.v3,
          };
          setData(filteredData);
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
        });
    }
  }

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
            <SrsSelect
              id="source-select"
              ref={sourceRef}
              onChange={(e) => {
                let value = e.target.value;
                setSource(value);
                getSRSData(value, setSourceData);
                machineContext.sourceSrs = "value";
                if (current.matches("ready.allinactive")) {
                  send("READYTOTRANSFORM");
                }
              }}
            >
              <option value={source}>{source}</option>
              {srs.map((srs) => {
                if (typeof srs !== "string") {
                  return (
                    <SrsOptions key={`${srs}-source`} srs={srs}></SrsOptions>
                  );
                } else {
                  return (
                    <optgroup
                      key={`${srs}-source`}
                      label={dictionary[srs.toLowerCase()]} // Translate GL to Greenland and DK to Denmark
                    ></optgroup>
                  );
                }
              })}
            </SrsSelect>
          </FlexColumnCenter>
        </SrsFrom>

        <SrsTo>
          <SrsLabel htmlFor="destination-select">To</SrsLabel>
          <FlexColumnCenter>
            <SRSInfoBox
              isSRSSelected={srs.flat().includes(destination)}
              data={destinationData}
            />
            <SrsSelect
              id="destination-select"
              ref={destinationRef}
              onChange={(e) => {
                const value = e.target.value;
                setDestination(value);
                getSRSData(value, setDestinationData);
                machineContext.destinationSrs = value;
                if (current.matches("ready.allinactive")) {
                  send("READYTOTRANSFORM");
                }
              }}
            >
              <option value={destination}>{destination}</option>
              {srs.map((srs) => {
                if (typeof srs !== "string") {
                  return (
                    <SrsOptions key={`${srs}-dest`} srs={srs}></SrsOptions>
                  );
                } else {
                  return (
                    <optgroup
                      key={`${srs}-dest`}
                      label={dictionary[srs.toLowerCase()]} // Translate GL to Greenland and DK to Denmark
                    ></optgroup>
                  );
                }
              })}
            </SrsSelect>
          </FlexColumnCenter>
        </SrsTo>
      </SrsFormContainer>
    </>
  );
}

export default SourceDestinationSelecter;
