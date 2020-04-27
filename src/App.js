import React, { useState } from "react";
import { useMachine } from "@xstate/react";
import { transformMachine } from "./context/machine";

//Import context
import { CoordinateProvider } from "./context/CoordinateContext";
import { SRSProvider } from "./context/SRSContext";
import { RefProvider } from "./context/RefContext";

//Import components
import SourceDestinationSelector from "./components/SourceDestinationSelector/SourceDestinationSelector";
import LeafMap from "./components/Map/LeafMap";
import ProgressStatus from "./components/LooseComponents/ProgressStatus";
import SidePanel from "./components/SidePanel/SidePanel";

//Import functions
import { initializeSRS } from "./functions/fetching";
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
                <LeafMap current={current}></LeafMap>

                <TransformSelectContainer>
                  <TransformSelectGrid>
                    <SourceDestinationSelector
                      srs={srs}
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
      return <div> Failed to fetch required ressources, try again later </div>;

    default:
      return <div>Switch Logic went wrong!</div>;
  }
}

export default App;
