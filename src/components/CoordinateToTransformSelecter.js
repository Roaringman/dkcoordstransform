import React, { useState, useContext } from "react";

// Import context
import { SRSContext } from "../context/SRSContext";

// Import utils
import { dictionary } from "../utils/dictionary";

// Import styles
import {
  CoordinateAddForm,
  UlFlex,
  CoordinateInput,
  CoordinateSubmit,
  CoordinateForm,
  Checkbox,
} from "../styles/elements";

// Import functions
import addCoordinatesToTransform from "../functions/addCoordinatesToTransform";

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

function CoordinateToTransformSelecter(props) {
  const { sourceData } = useContext(SRSContext);
  const [longitude, setLongitude] = useState();
  const [Latitude, setLatitude] = useState();
  const [ZComponent, setZComponent] = useState();
  const [epoch, setEpoch] = useState();
  const [ZComponentChecked, setZComponentChecked] = useState({
    checked: false,
  });
  const [epochChecked, setEpochChecked] = useState({ checked: false });

  const handleZChange = (event) => {
    setZComponentChecked({ checked: !props.current.context.height });
    props.current.context.height = event.target.checked;
  };
  const handleEpochChange = (event) =>
    setEpochChecked({ checked: event.target.checked });

  return (
    <>
      <CoordinateAddForm>
        <CoordinateForm
          onSubmit={(e) => {
            props.current.context.height = ZComponentChecked.checked;
            const coordinateComponents = [longitude, Latitude];
            if (props.current.context.height)
              coordinateComponents.push(parseFloat(ZComponent));
            if (epoch) coordinateComponents.push(epoch);
            addCoordinatesToTransform(e, props, ...coordinateComponents);
          }}
        >
          <UlFlex>
            <li>
              <CoordinateInput
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
              />
            </li>
            <li>
              <CoordinateInput
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
              />
            </li>
          </UlFlex>

          <div>
            <div>
              <label htmlFor="z-check">
                <Checkbox
                  type="checkbox"
                  id="z-check"
                  name="Z"
                  value="Z"
                  checked={props.current.context.height && sourceData.Z != null}
                  onChange={handleZChange}
                  ref={props.ZChecked}
                  disabled={sourceData.Z === null ? true : false}
                />
                Add Z-component
              </label>

              <label htmlFor="epoch-check">
                <Checkbox
                  type="checkbox"
                  id="epoch-check"
                  name="Epoch"
                  value="Epoch"
                  checked={epochChecked.checked}
                  onChange={handleEpochChange}
                  disabled={true}
                />
                Add Epoch
              </label>
            </div>
            <div>
              {props.current.context.height && sourceData.Z && (
                <li>
                  <CoordinateInput
                    required
                    placeholder={
                      isEmpty(sourceData)
                        ? "Height/Z"
                        : `${dictionary[sourceData.Z.toLowerCase()]}`
                    }
                    type="text"
                    inputMode="numeric"
                    pattern="^[-]?\d*\.?\d+$"
                    name="third"
                    onChange={(e) => setZComponent(e.target.value)}
                  />
                </li>
              )}
              {epochChecked.checked && (
                <li>
                  <CoordinateInput
                    required
                    placeholder="Epoch"
                    type="text"
                    inputMode="numeric"
                    pattern="^[-]?\d*\.?\d+$"
                    name="second"
                    onChange={(e) => setEpoch(epoch)}
                  />
                </li>
              )}
            </div>
          </div>

          <CoordinateSubmit
            type="submit"
            value="Add coordinates"
            disabled={props.current.matches("ready.transformed")}
          />
        </CoordinateForm>
      </CoordinateAddForm>
    </>
  );
}

export default CoordinateToTransformSelecter;
