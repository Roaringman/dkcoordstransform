import React, { useState } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useMachine } from "@xstate/react";
import { transformMachine } from "./components/machine";
import "./App.css";
import initializeSRS from "./functions/fetching";
import dragAndDropHandlers from "./functions/dragAndDropHandlers";
import generateRandomID from "./functions/generateRandomID";
import {
  Title,
  TransformSelectContainer,
  TransformSelectGrid,
  UIContainer,
  ProgressItem,
  StatusContainer,
  OverflowUL,
  BtnContainer,
  ActiveBtn,
  InactiveBtn
} from "./styles/elements";

import CoordinateToTransformSelecter from "./components/CoordinateToTransformSelecter";
import SourceDestinationSelecter from "./components/SourceDestinationSelecter";
import CoordinateLI from "./components/CoordinateLI";

function App() {
  const { dragOverHandler, dropHandler } = dragAndDropHandlers;
  const [srs, setSrs] = useState([]);
  const [coordinatesToTransform, setCoordinatesToTransform] = useState([]);
  const [source, setSource] = useState("--Please choose an option--");
  const [destination, setDestination] = useState("--Please choose an option--");
  const incompatibleSRSError =
    "It is not possible to transform between the selected coordinate systems. Press Reset to choose new settings.";
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
        setSource("--Please choose an option--");
        setDestination("--Please choose an option--");
      }
    }
  });

  function createCoordinateString(coordinateComponentList) {
    let coordinateString = "";
    coordinateString += `${parseFloat(coordinateComponentList[0]).toFixed(8)}`;
    coordinateString += `,${parseFloat(coordinateComponentList[1]).toFixed(8)}`;
    if (coordinateComponentList[2])
      coordinateString += `,${coordinateComponentList[2]}`;
    return coordinateString;
  }

  function submitTranslateRequest(
    coordinateObject,
    from,
    to,
    displayOrDesination,
    isDisplayCoord
  ) {
    let first, second;
    //If the required coordinate is for displaying, use the already calculated destination coordinate to transform to EPSG:4326
    isDisplayCoord && coordinateObject.destinationCoords
      ? ([first, second] = coordinateObject.destinationCoords)
      : ([first, second] = coordinateObject.sourceCoords);

    const coordinateComponents = [first, second];
    if (coordinateObject.sourceCoords[2])
      coordinateComponents.push(coordinateObject.sourceCoords[2]);

    if (srs.flat().includes(source) && srs.flat().includes(destination))
      fetch(
        `https://services.kortforsyningen.dk/rest/webproj/v1.0/trans/${from}/${to}/${createCoordinateString(
          coordinateComponents
        )}?token=8336526c09097038d0436ba18e95153b`
      )
        .then(response => {
          if (!response.ok) {
            throw response;
          } else {
            return response.json();
          }
        })
        .then(result => {
          addTransformedCoordinates(
            result,
            coordinateObject,
            displayOrDesination,
            1 // success
          );
        })
        .catch(error => {
          error.json().then(errorMessage => {
            if (
              errorMessage.message ===
              "CRS's are not compatible across countries"
            ) {
              send("FAILEDTOTRANSFORM");
            } else {
              addTransformedCoordinates(
                { v1: null, v2: null },
                coordinateObject,
                displayOrDesination,
                2 // out of bounds
              );
            }
          });
        });
  }

  function addCoordinatesToTransform(evt, longitude, latitude, height) {
    current.context.coords.push([longitude, latitude]);

    const coordinate = [longitude, latitude];
    if (height) coordinate.push(height);

    evt.preventDefault();
    setCoordinatesToTransform([
      ...coordinatesToTransform,
      {
        sourceCoords: coordinate,
        id: generateRandomID(8)
      }
    ]);

    if (current.matches("ready.allinactive")) {
      send("READYTOTRANSFORM");
    }
  }

  function addTransformedCoordinates(
    result,
    coordinateObject,
    displayOrDesination,
    responseState
  ) {
    coordinateObject[displayOrDesination] = [result.v1, result.v2];
    coordinateObject["responseState"] = responseState;
    let newState = [...coordinatesToTransform];
    const index = newState.findIndex(e => e.id === coordinateObject.id);
    newState[index] = coordinateObject;
    setCoordinatesToTransform(newState);
  }

  async function* run(coords) {
    if (!current.matches("ready.transformed")) {
      for (const coord of coords) {
        if (coord.sourceCoords) {
          if (source === "EPSG:4326" && destination !== "EPSG:4326") {
            yield submitTranslateRequest(
              coord,
              source,
              destination,
              "destinationCoords",
              false
            );
          }
          if (destination === "EPSG:4326" && source !== "EPSG:4326") {
            coordinatesToTransform.displayCoords.push(coord.sourceCoords);
            yield submitTranslateRequest(
              coord,
              source,
              destination,
              "destinationCoords",
              false
            );
          }
          //If neither source or destination is EPSG:4326, fetch twice to get destination and said srs.
          if (destination !== "EPSG:4326" && source !== "EPSG:4326") {
            yield submitTranslateRequest(
              coord,
              source,
              destination,
              "destinationCoords",
              false
            );
          }

          await delay(100);
        }
      }

      for (const coord of coords) {
        if (
          coord.destinationCoords &&
          coord.destinationCoords[0] !== "undefined"
        ) {
          yield submitTranslateRequest(
            coord,
            destination,
            "EPSG:4326",
            "displayCoords",
            true
          );
        }
      }
    }
  }

  async function iterateCoordinates() {
    const asyncIterator = run(coordinatesToTransform);
    for await (const val of asyncIterator) {
      send("TRANSFORM");

      console.log(current.value);

      continue;
    }
    send("SUCCESS");
  }

  function delay(ms) {
    return new Promise(function(resolve, reject) {
      setTimeout(resolve, ms);
    });
  }

  function reset() {
    send("RESET");
  }

  switch (true) {
    case current.matches("initial"):
      return <div> Loading </div>;
    case current.matches("failed"):
      return <div> Failed to fetch required ressources </div>;
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
          <Map center={[56.88484306, 11.2214225]} zoom={7}>
            <TileLayer
              url="https://api.mapbox.com/styles/v1/rgengell/ck5sntzl51eyy1imfdnwkqnhp/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmdlbmdlbGwiLCJhIjoiY2pjaXdxaW5wMXkwbjJ4bzA2OG5iYXc2diJ9.WusoFmQuICEWtBh0pKioMQ"
              attribution='&copy;  <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />

            {coordinatesToTransform.map((markerCords, i) => {
              if (
                markerCords.displayCoords &&
                typeof markerCords.displayCoords[0] === "number"
              ) {
                return (
                  <Marker
                    key={i + "s"}
                    position={[
                      markerCords.displayCoords[0],
                      markerCords.displayCoords[1]
                    ]}
                  />
                );
              }
            })}
          </Map>

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
            <CoordinateToTransformSelecter
              addCoordinatesToTransform={addCoordinatesToTransform}
            />

            <OverflowUL>
              {coordinatesToTransform.length === 0 ? (
                <li>Add coordinates to transform</li>
              ) : null}
              {current.matches("ready.failedtotransform") ? (
                <p>{incompatibleSRSError}</p>
              ) : (
                coordinatesToTransform.map((coordinates, i) => {
                  return (
                    <CoordinateLI
                      key={i}
                      coordinates={coordinates}
                    ></CoordinateLI>
                  );
                })
              )}
            </OverflowUL>
            <BtnContainer>
              {current.matches("ready.active") ? (
                <ActiveBtn onClick={iterateCoordinates}>Transform</ActiveBtn>
              ) : (
                <InactiveBtn> Transform </InactiveBtn>
              )}

              <InactiveBtn> Download Result </InactiveBtn>
            </BtnContainer>
          </UIContainer>

          <StatusContainer>
            <ProgressItem>
              {current.context.sourceSrs &&
              current.context.destinationSrs !== ""
                ? "Done"
                : "Choose spatial reference systems"}
            </ProgressItem>
            <ProgressItem>
              {current.context.coords.length > 0
                ? "Done"
                : "Add coordinates to transform"}
            </ProgressItem>
            <ProgressItem>
              {current.matches("ready.transformed")
                ? "Done"
                : "Transform coordinates"}
            </ProgressItem>
            <button onClick={reset}> Reset </button>
          </StatusContainer>
        </div>
      );
    default:
      return <div>Switch Logic went wrong!</div>;
  }
}

export default App;
