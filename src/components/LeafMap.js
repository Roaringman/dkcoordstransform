import React, { useState, useContext } from "react";
import { Map, Marker, TileLayer, ZoomControl, Popup } from "react-leaflet";

//Import context
import { CoordinateContext } from "../context/CoordinateContext";

function LeafMap() {
  const [coordinatesToTransform] = useContext(CoordinateContext);

  const [center, setCenter] = useState([56.88484306, 11.2214225]);
  const [activeMarker, setActiveMarker] = useState(null);

  return (
    <Map center={center} zoom={7} zoomControl={false}>
      <TileLayer
        url="https://api.mapbox.com/styles/v1/rgengell/ck5sntzl51eyy1imfdnwkqnhp/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmdlbmdlbGwiLCJhIjoiY2pjaXdxaW5wMXkwbjJ4bzA2OG5iYXc2diJ9.WusoFmQuICEWtBh0pKioMQ"
        attribution='&copy;  <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <ZoomControl position="bottomright"></ZoomControl>

      {coordinatesToTransform.map((marker, i) => {
        if (
          marker.displayCoords &&
          marker.displayCoords.includes("undefined")
        ) {
          return (
            <Marker
              key={i + "s"}
              position={[marker.displayCoords[0], marker.displayCoords[1]]}
              onClick={() => setActiveMarker(marker)}
            />
          );
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
          <table>
            <tbody>
              <tr>
                <th>From X</th>
                <th>To X</th>
                <th>From Y</th>
                <th>To Y</th>
              </tr>
              <tr>
                <td>{activeMarker.sourceCoords[0]}</td>
                <td>{activeMarker.destinationCoords[0]}</td>
                <td>{activeMarker.sourceCoords[1]}</td>
                <td>{activeMarker.destinationCoords[1]}</td>
              </tr>
            </tbody>
          </table>
        </Popup>
      )}
    </Map>
  );
}

export default LeafMap;
