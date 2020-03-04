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
          type="number"
          name="first"
          value={firstComponent}
          onChange={e => (firstComponent = parseFloat(e.target.value))}
        />

        <br />

        <label>Second coordinate component</label>
        <input
          type="number"
          name="second"
          value={secondComponent}
          onChange={e => (secondComponent = parseFloat(e.target.value))}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </CoordinateAddForm>
  );
}

export default CoordinateToTransformSelecter;
