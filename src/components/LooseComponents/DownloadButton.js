import React, { useContext } from "react";

//Import context
import { CoordinateContext } from "../../context/CoordinateContext";
import { SRSContext } from "../../context/SRSContext";

//Import style
import { DownloadButtonStyle, DownloadButtonStyleInactive } from "./StylesLooseComponents/LooseComponentElements";

function DownloadButton(props) {
  const { current } = props;
  const { coordinatesToTransform } = useContext(CoordinateContext);
  const { source, destination } = useContext(SRSContext);

  var data = [];
  coordinatesToTransform.map((coordinate) =>
    coordinate.destinationCoords !== null
      ? data.push(coordinate.destinationCoords)
      : null
  );

  function download_csv() {
    var csv = "x,y,h,\n";
    data.forEach(function (row) {
      csv += row.join(",");
      csv += "\n";
    });

    var hiddenElement = document.createElement("a");
    var filename = `${source.replace(":", "")}-to-${destination.replace(
      ":",
      ""
    )}_${data.length}`;
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
    hiddenElement.target = "_blank";
    hiddenElement.download = `${filename}.csv`;
    hiddenElement.click();
  }

  if (current.matches("ready.transformed") && data.length > 0) {
    return (
      <DownloadButtonStyle onClick={() => download_csv()}>
        Download results
      </DownloadButtonStyle>
    );
  } else {
    return (
      <DownloadButtonStyleInactive>
        Download results
      </DownloadButtonStyleInactive>
    );
  }
}

export default DownloadButton;
