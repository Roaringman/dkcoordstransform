import React, { useState } from "react";
import { useMachine } from "@xstate/react";
import { transformMachine } from "./components/machine";

//Import context
import { CoordinateProvider } from "./context/CoordinateContext";
import { SRSProvider } from "./context/SRSContext";
import { RefProvider } from "./context/RefContext";

//Import components
import SourceDestinationSelecter from "./components/SourceDestinationSelecter";
import LeafMap from "./components/LeafMap";
import ProgressStatus from "./components/ProgressStatus";
import SidePanel from "./components/SidePanel";

//Import functions
import initializeSRS from "./functions/fetching";
import dragAndDropHandlers from "./functions/dragAndDropHandlers";

//Import styles
import "./App.css";
import {
  TransformSelectContainer,
  TransformSelectGrid,
  UIContainer,
  StatusContainer,
} from "./styles/elements";

function App() {
  const { dragOverHandler, dropHandler } = dragAndDropHandlers;
  const [srs, setSrs] = useState([]);

  const [current, send] = useMachine(transformMachine, {
    actions: {
      load: () => {
        initializeSRS(current).then((result) => {
          current.context.srs = result.allSRS;
          setSrs(current.context.srs);
          send(result.state);
        });
      },
      reset: (context) => {
        context.sourceSrs = "";
        context.destinationSrs = "";
        context.coords = false;
        context.coordinates = [];
      },
    },
  });

  /* const dropProps = {
    current: current,
    send: send,
    coordinatesToTransform: coordinatesToTransform,
    setCoordinatesToTransform: setCoordinatesToTransform
  };*/

  switch (true) {
    case current.matches("ready"):
      return (
        <CoordinateProvider>
          <SRSProvider>
            <RefProvider>
              <div
                className="App"
                id="drop_zone"
                onDrop={(e) => dropHandler(e, null /*dropProps*/)}
                onDragOver={(e) => dragOverHandler(e)}
              >
                <LeafMap></LeafMap>

                <TransformSelectContainer>
                  <TransformSelectGrid>
                    <SourceDestinationSelecter
                      srs={srs}
                      machineContext={current.context}
                      send={send}
                      current={current}
                    />
                  </TransformSelectGrid>
                </TransformSelectContainer>

                <UIContainer>
                  <SidePanel send={send} current={current}></SidePanel>
                </UIContainer>

                <StatusContainer>
                  <ProgressStatus current={current} send={send} />
                </StatusContainer>
              </div>
            </RefProvider>
          </SRSProvider>
        </CoordinateProvider>
      );

    case current.matches("initial"):
      return <div> Loading... </div>;
    case current.matches("failed"):
      return <div> Failed to fetch required ressources </div>;

    default:
      return <div>Switch Logic went wrong!</div>;
  }
}

export default App;
