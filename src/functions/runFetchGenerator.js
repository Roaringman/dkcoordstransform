export async function fetchAndUpdateCoordinate(
  source,
  destination,
  coordinateToTransform
) {
  const {
    destinationCoords,
    displayCoords,
    id,
    sourceCoords
  } = coordinateToTransform;

  let httpRequest = "";
  if (!destinationCoords) {
    httpRequest = createCoordinateString(source, destination, sourceCoords);
  }
  if (destinationCoords) {
    httpRequest = createCoordinateString(
      destination,
      "EPSG:4326",
      destinationCoords
    );
  }

  let fetchReturn = [];
  if (httpRequest !== "sameSourceAndDestination") {
    fetchReturn = await fetchTransform(httpRequest);
  }

  //if error
  if (fetchReturn.message) {
    const updatedCoordinateData = {
      destinationCoords,
      displayCoords,
      id,
      responseState: getErrorCode(fetchReturn.message),
      sourceCoords
    };
    return updatedCoordinateData;
  }
  //if no error message
  else {
    const updatedCoordinateData = {
      destinationCoords: !destinationCoords
        ? Object.values(fetchReturn)
        : destinationCoords,
      displayCoords: destinationCoords ? Object.values(fetchReturn) : null,
      id,
      responseState: 1,
      sourceCoords
    };
    return updatedCoordinateData;
  }
}

export function createCoordinateString(
  source,
  destination,
  coordinateComponents
) {
  if (source !== destination) {
    const filteredCoordinateComponents = coordinateComponents.filter(el => {
      return el != null;
    }); //For now removes all null - TODO fix for epoch
    let coordinateString = "";
    const temp = filteredCoordinateComponents.toString();
    temp.endsWith(",")
      ? (coordinateString = temp.substring(0, temp.length - 1))
      : (coordinateString = temp);
    return `https://services.kortforsyningen.dk/rest/webproj/v1.0/trans/${source}/${destination}/${coordinateString}?token=8336526c09097038d0436ba18e95153b`;
  } else {
    return "sameSourceAndDestination";
  }
}

export function getErrorCode(errorMessage) {
  switch (errorMessage) {
    case "Input coordinate outside area of use of either source or destination CRS":
      return 2;
    case "CRS's are not compatible across countries":
      return 3;
    default:
      return 999;
  }
}

export async function fetchTransform(httpRequest) {
  try {
    const result = await fetch(httpRequest);
    return result.json();
  } catch (error) {
    return error;
  }
}
