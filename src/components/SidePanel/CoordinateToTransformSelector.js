import React, { useState, useContext } from "react";

//Import context
import { SRSContext } from "../../context/SRSContext";
import { CoordinateContext } from "../../context/CoordinateContext";

// Import utils
import { dictionary, isEmpty } from "../../utils/dictionary";

// Import styles
import { FlexRow } from "../../styles/elements";
import {
  ActiveBtn,
  InactiveBtn,
  UlFlex,
  Checkbox,
  CoordinateAddForm,
  CoordinateInput,
  CoordinateSubmit,
  CoordinateForm,
  CoordinateFormSection,
  SpanEnd,
} from "./StylesSidePanel/SidePanelElements";

// Import functions
import addCoordinatesToTransform from "../../functions/addCoordinatesToTransform";

function CoordinateToTransformSelector(props) {
  const { current, ZChecked, iterateCoordinates } = props;
  const { sourceData } = useContext(SRSContext);

  //Component private state
  const [longitude, setLongitude] = useState();
  const [Latitude, setLatitude] = useState();
  const [ZComponent, setZComponent] = useState();
  const [ZComponentChecked, setZComponentChecked] = useState({
    checked: false,
  });

  const handleZChange = (event) => {
    setZComponentChecked({ checked: !current.context.height });
    current.context.height = event.target.checked;
  };

  return (
    <>
      <CoordinateAddForm>
        <CoordinateForm
          onSubmit={(e) => {
            current.context.height = ZComponentChecked.checked;
            const coordinateComponents = [longitude, Latitude];
            if (current.context.height)
              coordinateComponents.push(parseFloat(ZComponent));

            addCoordinatesToTransform(e, props, ...coordinateComponents);
          }}
        >
          <CoordinateFormSection>
            <UlFlex>
              <CoordinateInput
                key={"x"}
                required
                placeholder={
                  isEmpty(sourceData)
                    ? "Longitude/X"
                    : `${dictionary[sourceData.X.toLowerCase()]}`
                }
                type="text"
                inputMode="numeric"
                pattern="^[-]?\d*\.?\d+$"
                name="first"
                onChange={(e) => setLongitude(parseFloat(e.target.value))}
                disabled={
                  current.matches("ready.transformed") ||
                  current.matches("ready.failedtotransform")
                }
              />

              <CoordinateInput
                key={"y"}
                required
                placeholder={
                  isEmpty(sourceData)
                    ? "Latitude/Y"
                    : `${dictionary[sourceData.Y.toLowerCase()]}`
                }
                type="text"
                inputMode="numeric"
                pattern="^[-]?\d*\.?\d+$"
                name="second"
                onChange={(e) => setLatitude(parseFloat(e.target.value))}
                disabled={
                  current.matches("ready.transformed") ||
                  current.matches("ready.failedtotransform")
                }
              />
            </UlFlex>

            <UlFlex>
              <SpanEnd>
                <label htmlFor="z-check">
                  Add height
                  <Checkbox
                    type="checkbox"
                    id="z-check"
                    name="Z"
                    value="Z"
                    checked={ZComponentChecked.checked}
                    onChange={handleZChange}
                    ref={ZChecked}
                    disabled={
                      sourceData ||
                      current.matches("ready.transformed") ||
                      current.matches("ready.failedToTransform")
                    }
                  />
                </label>
              </SpanEnd>
              <CoordinateInput
                required
                placeholder={
                  isEmpty(sourceData.Z)
                    ? "Height/Z"
                    : `${dictionary[sourceData.Z.toLowerCase()]}`
                }
                type="text"
                inputMode="numeric"
                pattern="^[-]?\d*\.?\d+$"
                name="third"
                onChange={(e) => setZComponent(e.target.value)}
                disabled={
                  current.matches("ready.transformed") ||
                  current.matches("ready.failedToTransform") ||
                  !ZComponentChecked.checked
                }
              />
            </UlFlex>
          </CoordinateFormSection>

          <FlexRow>
            <CoordinateSubmit
              type="submit"
              value="Add Coordinate"
              disabled={current.matches("ready.transformed")}
            />

            {current.matches("ready.active") ? (
              <ActiveBtn onClick={iterateCoordinates}>Transform</ActiveBtn>
            ) : (
              <InactiveBtn> Transform </InactiveBtn>
            )}
          </FlexRow>
        </CoordinateForm>
      </CoordinateAddForm>
    </>
  );
}

export default CoordinateToTransformSelector;
