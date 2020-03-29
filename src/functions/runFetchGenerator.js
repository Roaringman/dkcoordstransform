function submitTranslateRequest(
  coordinatesToTransform,
  setCoordinatesToTransform,
  send,
  context,
  coordinateObject,
  from,
  to,
  displayOrDesination,
  isDisplayCoord
) {
  const srs = context.srs;
  const source = context.sourceSrs;
  const destination = context.destinationSrs;
  let first, second;

  //If the required coordinate is for displaying, use the already calculated destination coordinate to transform to EPSG:4326
  isDisplayCoord && coordinateObject.destinationCoords
    ? ([first, second] = coordinateObject.destinationCoords)
    : ([first, second] = coordinateObject.sourceCoords);

  const coordinateComponents = [first, second];
  if (
    coordinateObject.sourceCoords[2] ||
    coordinateObject.sourceCoords[2] === 0 // sanity check
  )
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
          coordinatesToTransform,
          setCoordinatesToTransform,
          result,
          coordinateObject,
          displayOrDesination,
          1 // success
        );
      })
      .catch(error => {
        error.json().then(errorMessage => {
          if (
            errorMessage.message === "CRS's are not compatible across countries"
          ) {
            send("FAILEDTOTRANSFORM");
          } else {
            addTransformedCoordinates(
              coordinatesToTransform,
              setCoordinatesToTransform,
              { v1: null, v2: null },
              coordinateObject,
              displayOrDesination,
              2 // out of bounds
            );
          }
        });
      });
}

function addTransformedCoordinates(
  coordinatesToTransform,
  setCoordinatesToTransform,
  result,
  coordinateObject,
  displayOrDesination,
  responseState
) {
  coordinateObject[displayOrDesination] = [
    result.v1,
    result.v2,
    result.v3,
    result.v4
  ];
  coordinateObject["responseState"] = responseState;
  let newState =
    coordinatesToTransform.length === 1
      ? coordinatesToTransform
      : [...coordinatesToTransform];
  const index = newState.findIndex(e => e.id === coordinateObject.id);
  newState[index] = coordinateObject;
  setCoordinatesToTransform(newState);
}

function createCoordinateString(coordinateComponentList) {
  let coordinateString = "";
  coordinateString += `${parseFloat(coordinateComponentList[0]).toFixed(8)}`;
  coordinateString += `,${parseFloat(coordinateComponentList[1]).toFixed(8)}`;
  if (coordinateComponentList[2] || coordinateComponentList[2] === 0)
    coordinateString += `,${parseFloat(coordinateComponentList[2])}`;
  return coordinateString;
}
async function* runCoordinateTransformGenerator(transformData) {
  const [
    send,
    current,
    coordinatesToTransform,
    setCoordinatesToTransform,
    context
  ] = transformData;

  if (!current.matches("ready.transformed")) {
    for (const coord of coordinatesToTransform) {
      if (coord.sourceCoords) {
        if (
          context.sourceSrs === "EPSG:4326" &&
          context.destinationSrs !== "EPSG:4326"
        ) {
          yield submitTranslateRequest(
            coordinatesToTransform,
            setCoordinatesToTransform,
            send,
            context,
            coord,
            context.sourceSrs,
            context.destinationSrs,
            "destinationCoords",
            false
          );
        }
        if (
          context.destinationSrs === "EPSG:4326" &&
          context.sourceSrs !== "EPSG:4326"
        ) {
          coordinatesToTransform.displayCoords.push(coord.sourceCoords);
          yield submitTranslateRequest(
            coordinatesToTransform,
            setCoordinatesToTransform,
            send,
            context,
            coord,
            context.sourceSrs,
            context.destinationSrs,
            "destinationCoords",
            false
          );
        }
        //If neither source or destination is EPSG:4326, fetch twice to get destination and said srs.
        if (
          context.destinationSrs !== "EPSG:4326" &&
          context.sourceSrs !== "EPSG:4326"
        ) {
          yield submitTranslateRequest(
            coordinatesToTransform,
            setCoordinatesToTransform,
            send,
            context,
            coord,
            context.sourceSrs,
            context.destinationSrs,
            "destinationCoords",
            false
          );
        }

        await delay(100);
      }
    }

    for (const coord of coordinatesToTransform) {
      if (
        coord.destinationCoords &&
        coord.destinationCoords[0] !== "undefined"
      ) {
        yield submitTranslateRequest(
          coordinatesToTransform,
          setCoordinatesToTransform,
          send,
          context,
          coord,
          context.destinationSrs,
          "EPSG:4326",
          "displayCoords",
          true
        );
      }
    }
  }
}

function delay(ms) {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, ms);
  });
}

export default runCoordinateTransformGenerator;
