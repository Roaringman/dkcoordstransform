import React, { useState, useContext } from "react";

import { useMachine } from "@xstate/react";
import { transformMachine } from "../context/machine";

//Import context
import { CoordinateContext } from "../context/CoordinateContext";
import { SRSContext } from "../context/SRSContext";
import { RefProvider } from "../context/RefContext";

//Import components
import SourceDestinationSelector from "./SourceDestinationSelector/SourceDestinationSelector";
import LeafMap from "./Map/LeafMap";
import ProgressStatus from "./LooseComponents/ProgressStatus";
import SidePanel from "./SidePanel/SidePanel";
import AbleToDisplay from "./LooseComponents/AbleToDisplay";
import DownloadButton from "./LooseComponents/DownloadButton";

//Import functions
import { initializeSRS } from "../functions/fetching";
import dragAndDropHandlers from "../functions/dragAndDropHandlers";

//Import styles
import "../App.css";
import {
  TransformSelectContainer,
  TransformSelectGrid,
  UIContainer,
  StatusContainer,
  Nav,
  StyledLink,
} from "../styles/elements";

function Main() {
  const [srs, setSrs] = useState([]);

  const { coordinatesToTransform, setCoordinatesToTransform } = useContext(
    CoordinateContext
  );

  const { dragOverHandler, dropHandler } = dragAndDropHandlers;

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

  const dropProps = {
    current: current,
    send: send,
    coordinatesToTransform: coordinatesToTransform,
    setCoordinatesToTransform: setCoordinatesToTransform,
  };

  switch (true) {
    case current.matches("ready"):
      return (
        <main
          className="App"
          id="drop_zone"
          onDrop={(e) => dropHandler(e, dropProps)}
          onDragOver={(e) => dragOverHandler(e)}
        >
          <Nav>
            <StyledLink to="/about">about</StyledLink>
          </Nav>

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

          <AbleToDisplay current={current} />
          <DownloadButton current={current} />

          <StatusContainer>
            <ProgressStatus current={current} send={send} srs={srs} />
          </StatusContainer>
        </main>
      );

    case current.matches("initial"):
      return <div> Loading... </div>;
    case current.matches("failed"):
      return <div> Failed to fetch required ressources, try again later </div>;

    default:
      return <div>Switch Logic went wrong!</div>;
  }
}

export default Main;
