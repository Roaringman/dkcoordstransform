import React from "react";
import styled from "styled-components";

const CoordinateAddForm = styled.div`
  display: flex;
  flex-direction: column;
`;

function CoordinateToTransformSelecter(props) {
  let secondComponent = 0;
  let firstComponent = 0;

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
          onChange={e => (firstComponent = e.target.value)}
        />

        <br />

        <label>Second coordinate component</label>
        <input
          type="number"
          name="second"
          value={secondComponent}
          onChange={e => (secondComponent = e.target.value)}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </CoordinateAddForm>
  );
}

export default CoordinateToTransformSelecter;
