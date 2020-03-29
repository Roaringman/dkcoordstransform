import React, { useState } from "react";
import {
  CoordinateAddForm,
  UlFlex,
  CoordinateInput,
  CoordinateSubmit,
  CoordinateForm
} from "../styles/elements";
import generateRandomID from "../functions/generateRandomID";

function CoordinateToTransformSelecter(props) {
  const {
    current,
    send,
    coordinatesToTransform,
    setCoordinatesToTransform
  } = props;

  const [longitude, setLongitude] = useState();
  const [Latitude, setLatitude] = useState();
  const [ZComponent, setZComponent] = useState();
  const [epoch, setEpoch] = useState();
  const [ZComponentChecked, setZComponentChecked] = useState({
    checked: false
  });
  const [epochChecked, setEpochChecked] = useState({ checked: false });

  const handleZChange = event =>
    setZComponentChecked({ checked: event.target.checked });

  const handleEpochChange = event =>
    setEpochChecked({ checked: event.target.checked });

  function addCoordinatesToTransform(evt, longitude, latitude, height) {
    evt.preventDefault();
    const coordinate = [longitude, latitude];
    current.context.coords = true;

    if (height) coordinate.push(height);

    setCoordinatesToTransform([
      {
        sourceCoords: coordinate,
        id: generateRandomID(8)
      },
      ...coordinatesToTransform
    ]);
    console.log(current.value);

    if (current.matches("ready.allinactive")) {
      send("READYTOTRANSFORM");
      console.log(current.value);
    }
  }

  return (
    <>
      <CoordinateAddForm>
        <CoordinateForm
          onSubmit={e => {
            const coordinateComponents = [longitude, Latitude];
            if (ZComponent) coordinateComponents.push(ZComponent);
            if (epoch) coordinateComponents.push(epoch);
            addCoordinatesToTransform(e, ...coordinateComponents);
          }}
        >
          <UlFlex>
            <li>
              <CoordinateInput
                required
                placeholder="Longitude/X"
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
                placeholder="Latitude/Y"
                type="text"
                inputMode="numeric"
                pattern="^[-]?\d*\.?\d+$"
                name="second"
                onChange={e => setLatitude(parseFloat(e.target.value))}
              />
            </li>
          </UlFlex>

          <div>
            <input
              type="checkbox"
              id="z-check"
              name="Z"
              value="Z"
              checked={ZComponentChecked.checked}
              onChange={handleZChange}
            />
            <label htmlFor="z-check"> Add Z-component</label>

            <input
              type="checkbox"
              id="epoch-check"
              name="Epoch"
              value="Epoch"
              checked={epochChecked.checked}
              onChange={handleEpochChange}
              disabled={true}
            />
            <label htmlFor="epoch-check">Add Epoch</label>
            <div>
              {ZComponentChecked.checked && (
                <li>
                  <CoordinateInput
                    required
                    placeholder="Height/Z"
                    type="text"
                    inputMode="numeric"
                    pattern="^[-]?\d*\.?\d+$"
                    name="second"
                    onChange={e => setZComponent(parseFloat(e.target.value))}
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
