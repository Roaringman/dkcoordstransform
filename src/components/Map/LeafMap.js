import React, { useState, useContext, useEffect } from "react";
import { Map, Marker, TileLayer, ZoomControl, Popup } from "react-leaflet";

//Import context
import { CoordinateContext } from "../../context/CoordinateContext";
import { SRSContext } from "../../context/SRSContext";

// Import styles
import {
  LeafletContainer,
  PopUpTable,
  PopUpTH,
  PopUpTD,
} from "./MapElements/MapElements";

function LeafMap(props) {
  const { current } = props;
  const { coordinatesToTransform } = useContext(CoordinateContext);
  const { destination } = useContext(SRSContext);

  const [center] = useState([56.88484306, 11.2214225]);
  const [maxBounds, setMaxBounds] = useState();
  const [activeMarker, setActiveMarker] = useState(null);

  useEffect(() => {
    //Sets the max bounds of the map based on existance of display coordinates
    let restrictBounds = [center];
    setMaxBounds(restrictBounds);
    if (
      current.matches("ready.transformed") &&
      coordinatesToTransform.length > 0 //&&
    ) {
      restrictBounds = [];
      coordinatesToTransform.map((coordinates) =>
        restrictBounds.push(coordinates.displayCoords)
      );
    }
    const filtered = restrictBounds.filter((value) => value !== null);
    filtered.length === 0 ? setMaxBounds([center]) : setMaxBounds(filtered);
  }, [center, current, coordinatesToTransform]);

  return (
    <LeafletContainer>
      <Map center={center} zoom={7} zoomControl={false} maxBounds={maxBounds}>
        <TileLayer
          url="https://api.mapbox.com/styles/v1/rgengell/ck5sntzl51eyy1imfdnwkqnhp/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmdlbmdlbGwiLCJhIjoiY2pjaXdxaW5wMXkwbjJ4bzA2OG5iYXc2diJ9.WusoFmQuICEWtBh0pKioMQ"
          attribution='&copy;  <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <ZoomControl position="bottomleft"></ZoomControl>

        {coordinatesToTransform.map((marker, i) => {
          const coordinate =
            destination === "EPSG:4326"
              ? marker.destinationCoords
              : marker.displayCoords;

          if (coordinate) {
            const filterCoordinate = coordinate.filter(
              (coordinate) => typeof coordinate === "number"
            );

            marker.displayCoords = filterCoordinate;

            return filterCoordinate.length >= 2 ? (
              <Marker
                key={i + "s"}
                position={[filterCoordinate[0], filterCoordinate[1]]}
                onClick={() => setActiveMarker(marker)}
              />
            ) : null;
          }
        })}

        {activeMarker && (
          <Popup
            position={[
              activeMarker.displayCoords[0],
              activeMarker.displayCoords[1],
            ]}
            onClose={() => setActiveMarker(null)}
          >
            <PopUpTable>
              <tbody>
                <tr>
                  <PopUpTH></PopUpTH>
                  <PopUpTH>From </PopUpTH>
                  <PopUpTH>To </PopUpTH>
                </tr>
                <tr>
                  <PopUpTH>X</PopUpTH>
                  <PopUpTD>{activeMarker.sourceCoords[0]}</PopUpTD>
                  <PopUpTD>{activeMarker.destinationCoords[0]}</PopUpTD>
                </tr>
                <tr>
                  <PopUpTH>Y</PopUpTH>
                  <PopUpTD>{activeMarker.sourceCoords[1]}</PopUpTD>
                  <PopUpTD>{activeMarker.destinationCoords[1]}</PopUpTD>
                </tr>
              </tbody>
            </PopUpTable>
          </Popup>
        )}
      </Map>
    </LeafletContainer>
  );
}

export default LeafMap;
