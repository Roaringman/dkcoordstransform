import React, { useState } from "react";
import { CoordinateAddForm, InputTableRow } from "../styles/elements";

function CoordinateToTransformSelecter(props) {
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

  return (
    <CoordinateAddForm>
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
        />
        <label htmlFor="epoch-check">Add Epoch</label>
      </div>
      <form
        onSubmit={e => {
          const coordinateComponents = [longitude, Latitude];
          if (ZComponent) coordinateComponents.push(ZComponent);
          if (epoch) coordinateComponents.push(epoch);
          props.addCoordinatesToTransform(e, ...coordinateComponents);
        }}
      >
        <table>
          <tbody>
            <InputTableRow>
              <td>
                <input
                  required
                  placeholder="Longitude/X"
                  type="text"
                  inputMode="numeric"
                  pattern="^[-]?\d*\.?\d+$"
                  name="first"
                  onChange={e => setLongitude(parseFloat(e.target.value))}
                />
              </td>
              <td>
                <input
                  required
                  placeholder="Latitude/Y"
                  type="text"
                  inputMode="numeric"
                  pattern="^[-]?\d*\.?\d+$"
                  name="second"
                  onChange={e => setLatitude(parseFloat(e.target.value))}
                />
              </td>
              {ZComponentChecked.checked && (
                <td>
                  <input
                    required
                    placeholder="Height/Z"
                    type="text"
                    inputMode="numeric"
                    pattern="^[-]?\d*\.?\d+$"
                    name="second"
                    onChange={e => setZComponent(parseFloat(e.target.value))}
                  />
                </td>
              )}
              {epochChecked.checked && (
                <td>
                  <input
                    required
                    placeholder="Epoch"
                    type="text"
                    inputMode="numeric"
                    pattern="^[-]?\d*\.?\d+$"
                    name="second"
                    onChange={e => console.log("epoch")}
                  />
                </td>
              )}
            </InputTableRow>
          </tbody>
        </table>

        <input type="submit" value="Add coordinates" />
      </form>
    </CoordinateAddForm>
  );
}

export default CoordinateToTransformSelecter;
