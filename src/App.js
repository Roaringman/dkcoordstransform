import React, { useState } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import styled from "styled-components";
import { useMachine } from "@xstate/react";
import { Machine } from "xstate";
import "./App.css";
import initializeSRS from "./functions/fetching";
import dragAndDropHandlers from "./functions/dragAndDropHandlers";

import CoordinateToTransformSelecter from "./components/CoordinateToTransformSelecter";
import SourceDestinationSelecter from "./components/SourceDestinationSelecter";

function App() {
  const transformMachine = Machine(
    {
      id: "coordinateTransformMachine",
      initial: "initial",
      context: { srs: [], sourceSrs: "", destinationSrs: "", coords: [] },
      states: {
        initial: {
          entry: ["load"],
          on: {
            LOADED: {
              target: "ready"
            },
            FAILED: "failed"
          }
        },
        ready: {
          initial: "allinactive",
          states: {
            allinactive: {
              entry: ["reset"],
              on: {
                READYTOTRANSFORM: { target: "active", cond: "canTransform" },
                RESET: { target: "allinactive" }
              }
            },
            active: {
              on: {
                TRANSFORM: { target: "transforming" },
                RESET: { target: "allinactive" },
                FAILEDTOTRANSFORM: { target: "failedtotransform" }
              }
            },
            transforming: {
              on: {
                FAILEDTOTRANSFORM: { target: "failedtotransform" },
                SUCCESS: { target: "transformed" }
              }
            },
            transformed: { on: { RESET: { target: "allinactive" } } },

            failedtotransform: {
              on: {
                RESET: { target: "allinactive" }
              }
            }
          }
        },

        failed: {}
      }
    },
    {
      guards: {
        canTransform: context =>
          context.sourceSrs !== "" &&
          context.destinationSrs !== "" &&
          context.coords.length >= 1
      }
    }
  );

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

  const Title = styled.h1`
    position: relative;
    z-index: 3;
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
  `;

  const TransformSelectContainer = styled.div`
    display: flex;
    position: relative;

    height: 20vh;
    width: 100vw;
    align-items: center;
    justify-content: center;
    background-color: palevioletred;
    z-index: 3;
  `;

  const UIContainer = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: start;
    min-height: 20vh;
    height: 50vh;
    margin: 2rem;
    width: 20vw;
    background-color: palevioletred;
    z-index: 3;
  `;

  const ProgressItem = styled.div`
    position: relative;
    background-color: pink;
    height: 25%;
    width: 100%;
  `;

  const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `;

  const OverflowUL = styled.ul`
    max-height: 70%;
    overflow: auto;
    width: calc(100% - 2.5rem);
  `;

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

    console.log(from, to);
    if (srs.flat().includes(source) && srs.flat().includes(destination))
      fetch(
        `https://services.kortforsyningen.dk/rest/webproj/v1.0/trans/${from}/${to}/${parseFloat(
          first
        ).toFixed(8)},${parseFloat(second).toFixed(
          8
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

  function addCoordinatesToTransform(evt, first, second) {
    current.context.coords.push([first, second]);

    evt.preventDefault();
    setCoordinatesToTransform([
      ...coordinatesToTransform,
      {
        sourceCoords: [first, second],
        id: Math.floor(Math.random() * Math.floor(9999))
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
    send("TRANSFORM");
    for await (const val of asyncIterator) {
      console.log(val);

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
        <div className="App">
          <header className="App-header">
            <Title>Danish Coordinate Transformer (Alpha)</Title>
          </header>

          <Map center={[56.88484306, 11.2214225]} zoom={7}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
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
          </TransformSelectContainer>

          <FlexRow>
            <UIContainer
              id="drop_zone"
              onDrop={e =>
                dropHandler(
                  e,
                  setCoordinatesToTransform,
                  coordinatesToTransform
                )
              }
              onDragOver={e => dragOverHandler(e)}
            >
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
                  coordinatesToTransform.map((li, i) => {
                    if (li.destinationCoords) {
                      return (
                        <li key={i}>
                          {li.responseState === 1
                            ? `${li.destinationCoords[0]}, ${li.destinationCoords[1]}`
                            : `Coordinates out of bounds`}
                        </li>
                      );
                    } else {
                      return (
                        <li
                          key={i}
                        >{`${li.sourceCoords[0]}, ${li.sourceCoords[1]}`}</li>
                      );
                    }
                  })
                )}
              </OverflowUL>
              <button onClick={iterateCoordinates}> Transform </button>
            </UIContainer>

            <UIContainer>
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
            </UIContainer>
          </FlexRow>
        </div>
      );
    default:
      return <div>Switch Logic went wrong!</div>;
  }
}

export default App;
