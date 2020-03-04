import React, { useState, useEffect } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import styled from "styled-components";
import "./App.css";

import CoordinateToTransformSelecter from "./components/CoordinateToTransformSelecter";
import SourceDestinationSelecter from "./components/SourceDestinationSelecter";

function App() {
  const [srs, setSrs] = useState([]);
  const [coordinatesToTransform, setCoordinatesToTransform] = useState([]);
  const [source, setSource] = useState("--Please choose an option--");
  const [destination, setDestination] = useState("--Please choose an option--");

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

  const CoordinatesToTransform = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: start;
    min-height: 20vh;
    max-height: 50vh;
    margin: 2rem;
    width: 20vw;
    overflow: auto;
    background-color: palevioletred;
    z-index: 3;
  `;

  function submitTranslateRequest(
    coordinateObject,
    from,
    to,
    displayOrDesination,
    isDisplayCoord
  ) {
    console.log(coordinateObject);
    let first, second;
    //If the required coordinate is for displaying, use the already calculated destination coordinate to transform to EPSG:4326
    isDisplayCoord && coordinateObject.destinationCoords
      ? ([first, second] = coordinateObject.destinationCoords)
      : ([first, second] = coordinateObject.sourceCoords);
    if (srs.flat().includes(source) && srs.flat().includes(destination))
      fetch(
        `https://services.kortforsyningen.dk/rest/webproj/v1.0/trans/${from}/${to}/${parseFloat(
          first
        ).toFixed(8)},${parseFloat(second).toFixed(
          8
        )}?token=8336526c09097038d0436ba18e95153b`
      )
        .then(response => {
          return response.json();
        })
        .then(result => {
          addTransformedCoordinates(
            result,
            coordinateObject,
            displayOrDesination
          );
        });
    else {
      console.log("Select a source and destination SRS");
    }
  }

  function addCoordinatesToTransform(evt, first, second) {
    evt.preventDefault();
    setCoordinatesToTransform([
      ...coordinatesToTransform,
      {
        sourceCoords: [first, second],
        id: Math.floor(Math.random() * Math.floor(9999))
      }
    ]);
  }

  function addTransformedCoordinates(
    result,
    coordinateObject,
    displayOrDesination
  ) {
    coordinateObject[displayOrDesination] = [result.v1, result.v2];
    let newState = [...coordinatesToTransform];
    const index = newState.findIndex(e => e.id === coordinateObject.id);
    newState[index] = coordinateObject;
    setCoordinatesToTransform(newState);
  }

  async function* run(coords) {
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
      } else {
        console.log("Cannot transform undefined coordinates");
      }
    }

    for (const coord of coords) {
      if (
        coord.destinationCoords &&
        coord.destinationCoords[0] !== "undefiend"
      ) {
        yield submitTranslateRequest(
          coord,
          source,
          "EPSG:4326",
          "displayCoords",
          true
        );
      }
    }
  }

  const asyncIterator = run(coordinatesToTransform);

  async function iterateCoordinates() {
    for await (const val of asyncIterator) {
      console.log(val);
      continue;
    }
  }

  function delay(ms) {
    return new Promise(function(resolve, reject) {
      setTimeout(resolve, ms);
    });
  }

  useEffect(() => {
    const allSRS = [];
    fetch(
      "https://services.kortforsyningen.dk/rest/webproj/v1.0/crs/?token=8336526c09097038d0436ba18e95153b"
    )
      .then(response => {
        return response.json();
      })
      .then(SRSJson => {
        for (let [key, value] of Object.entries(SRSJson)) {
          allSRS.push(key);
          allSRS.push(value);
        }
        setSrs(allSRS);
      });
  }, []);

  function dragOverHandler(ev) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  }

  function dropHandler(ev) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (ev.dataTransfer.items[i].kind === "file") {
          var file = ev.dataTransfer.items[i].getAsFile();
          file
            .text()
            .then(text => text.split("\r\n"))
            .then(arr => arr.map(item => item.split(",")))
            .then(items => {
              let coordsToAdd = [];
              items.map(coordPair => {
                if (coordPair.length === 2) {
                  return coordsToAdd.push({
                    sourceCoords: [coordPair[0], coordPair[1]],
                    id: Math.floor(Math.random() * Math.floor(9999))
                  });
                }
              });
              return coordsToAdd;
            })
            .then(coordsToAdd => {
              setCoordinatesToTransform([
                ...coordinatesToTransform,
                ...coordsToAdd
              ]);
            });
        }
      }
    } /*else {
      // Use DataTransfer interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.files.length; i++) {
        ev.dataTransfer.files[i].text().then(text => console.log(text));
      }
    }*/
  }

  return (
    <div className="App">
      <header className="App-header">
        <Title>Danish Coordinate Transformer (Alpha)</Title>
      </header>

      <Map center={[54.88484306, 11.2214225]} zoom={12}>
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
        />
      </TransformSelectContainer>

      <CoordinatesToTransform
        id="drop_zone"
        onDrop={e => dropHandler(e)}
        onDragOver={e => dragOverHandler(e)}
      >
        <CoordinateToTransformSelecter
          addCoordinatesToTransform={addCoordinatesToTransform}
        />
        <button onClick={iterateCoordinates}> Transform </button>

        <ul>
          <li>Add coordinates to transform</li>
          {coordinatesToTransform.map((li, i) => {
            if (li.destinationCoords) {
              return (
                <li
                  key={i}
                >{`${li.destinationCoords[0]}, ${li.destinationCoords[1]}`}</li>
              );
            } else {
              return (
                <li
                  key={i}
                >{`${li.sourceCoords[0]}, ${li.sourceCoords[1]}`}</li>
              );
            }
          })}
        </ul>
      </CoordinatesToTransform>
    </div>
  );
}

export default App;
