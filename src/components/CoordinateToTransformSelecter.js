import React from "react";
import styled from "styled-components";

const CoordinateAddForm = styled.div`
  display: flex;
  flex-direction: column;
`;

let secondComponent = 0;
let firstComponent = 0;

function CoordinateToTransformSelecter(props) {
  return (
    <CoordinateAddForm>
      <form
        onSubmit={e =>
          props.addCoordinatesToTransform(e, firstComponent, secondComponent)
        }
      >
        <label>First coordinate component</label>
        <input
          type="text"
          inputmode="numeric"
          pattern="[0-9]*"
          name="first"
          onChange={e => (firstComponent = parseFloat(e.target.value))}
        />

        <br />

        <label>Second coordinate component</label>
        <input
          type="text"
          inputmode="numeric"
          pattern="[0-9]*"
          name="second"
          //value={value => secondComponent + value}
          onChange={e => (secondComponent = parseFloat(e.target.value))}
        />
        <br />
        <input type="submit" value="Add coordinates" />
      </form>
    </CoordinateAddForm>
  );
}

export default CoordinateToTransformSelecter;
