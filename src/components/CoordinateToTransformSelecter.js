import React, { useState, useContext } from "react";
import {
  CoordinateAddForm,
  UlFlex,
  CoordinateInput,
  CoordinateSubmit,
  CoordinateForm,
  Checkbox,
  CheckMark
} from "../styles/elements";
import addCoordinatesToTransform from "../functions/addCoordinatesToTransform";

//Import context
import { SRSContext } from "../context/SRSContext";

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
    checked: false
  });
  const [epochChecked, setEpochChecked] = useState({ checked: false });

  const handleZChange = event => {
    setZComponentChecked({ checked: !props.current.context.height });
    props.current.context.height = event.target.checked;
  };
  const handleEpochChange = event =>
    setEpochChecked({ checked: event.target.checked });

  return (
    <>
      <CoordinateAddForm>
        <CoordinateForm
          onSubmit={e => {
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
                  isEmpty(sourceData) ? "Longitude/X" : `${sourceData.X}`
                }
                type="text"
                inputMode="numeric"
                pattern="^[-]?\d*\.?\d+$"
                name="first"
                onChange={e => setLongitude(parseFloat(e.target.value))}
              />
            </li>
            <li>
              <CoordinateInput
                required
                placeholder={
                  isEmpty(sourceData) ? "Latitude/Y" : `${sourceData.Y}`
                }
                type="text"
                inputMode="numeric"
                pattern="^[-]?\d*\.?\d+$"
                name="second"
                onChange={e => setLatitude(parseFloat(e.target.value))}
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
                      isEmpty(sourceData) ? "Height/Z" : `${sourceData.Z}`
                    }
                    type="text"
                    inputMode="numeric"
                    pattern="^[-]?\d*\.?\d+$"
                    name="third"
                    onChange={e => setZComponent(e.target.value)}
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
                    onChange={e => console.log("epoch")}
                  />
                </li>
              )}
            </div>
          </div>

          <CoordinateSubmit type="submit" value="Add coordinates" />
        </CoordinateForm>
      </CoordinateAddForm>
    </>
  );
}

export default CoordinateToTransformSelecter;
