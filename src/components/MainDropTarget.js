import React, { useContext } from "react";
import dragAndDropHandlers from "../functions/dragAndDropHandlers";

function MainDropTarget(props) {
  const { dragOverHandler, dropHandler } = dragAndDropHandlers;
  return (
    <main
      className="App"
      id="drop_zone"
      onDrop={(e) => dropHandler(e, null /*dropProps*/)}
      onDragOver={(e) => dragOverHandler(e)}
    >
      {props.children}
    </main>
  );
}

export default MainDropTarget();
