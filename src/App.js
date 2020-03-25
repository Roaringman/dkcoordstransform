import React, { useState } from "react";
import { useMachine } from "@xstate/react";
import { transformMachine } from "./components/machine";

//Import components
import SourceDestinationSelecter from "./components/SourceDestinationSelecter";
import LeafMap from "./components/LeafMap";
import ProgressStatus from "./components/ProgressStatus";
import SidePanel from "./components/SidePanel";
import ResetButton from "./components/ResetButton";

//Import functions
import initializeSRS from "./functions/fetching";
import dragAndDropHandlers from "./functions/dragAndDropHandlers";

//Import styles
import "./App.css";
import {
  TransformSelectContainer,
  TransformSelectGrid,
  UIContainer,
  StatusContainer
} from "./styles/elements";

function App() {
  const { dragOverHandler, dropHandler } = dragAndDropHandlers;
  const [srs, setSrs] = useState([]);
  const [coordinatesToTransform, setCoordinatesToTransform] = useState([]);
  const [source, setSource] = useState("--Please choose an option--");
  const [destination, setDestination] = useState("--Please choose an option--");

  const [current, send] = useMachine(transformMachine, {
    actions: {
      load: () => {
        initializeSRS(current).then(result => {
          current.context.srs = result.allSRS;
          setSrs(current.context.srs);
          send(result.state);
        });
      },
      reset: context => {
        context.sourceSrs = "";
        context.destinationSrs = "";
        context.coords = [];

        setCoordinatesToTransform([]);
      }
    }
  });

  switch (true) {
    case current.matches("ready"):
      return (
        <div
          className="App"
          id="drop_zone"
          onDrop={e =>
            dropHandler(e, setCoordinatesToTransform, coordinatesToTransform)
          }
          onDragOver={e => dragOverHandler(e)}
        >
          <LeafMap markerCoordinates={coordinatesToTransform}></LeafMap>

          <TransformSelectContainer>
            <TransformSelectGrid>
              <SourceDestinationSelecter
                source={source}
                destination={destination}
                setSource={setSource}
                setDestination={setDestination}
                srs={srs}
                machineContext={current.context}
                send={send}
                current={current}
              />
            </TransformSelectGrid>
          </TransformSelectContainer>

          <UIContainer>
            <SidePanel
              send={send}
              current={current}
              coordinatesToTransform={coordinatesToTransform}
              setCoordinatesToTransform={setCoordinatesToTransform}
            ></SidePanel>
          </UIContainer>
          <ResetButton
            current={current}
            send={send}
            setSource={setSource}
            setDestination={setDestination}
          ></ResetButton>
          <StatusContainer>
            <ProgressStatus current={current} />
          </StatusContainer>
        </div>
      );

    case current.matches("initial"):
      return <div> Loading </div>;
    case current.matches("failed"):
      return <div> Failed to fetch required ressources </div>;

    default:
      return <div>Switch Logic went wrong!</div>;
  }
}

export default App;
