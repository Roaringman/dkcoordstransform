import generateRandomID from "./generateRandomID";

export default function addCoordinatesToTransform(
  evt,
  props,
  longitude,
  latitude,
  height
) {
  if (evt) evt.preventDefault();

  const {
    current,
    send,
    coordinatesToTransform,
    setCoordinatesToTransform
  } = props;

  let coordinate = [longitude, latitude, height];
  current.context.coords = true;
  if (height === typeof number) {
    coordinate.push(height);
  }

  if (current.matches("ready.allinactive")) {
    send("READYTOTRANSFORM");
  }

  current.context.coordinates = [
    {
      sourceCoords: coordinate,
      destinationCoords: null,
      displayCoords: null,
      responseState: null,
      id: generateRandomID(8)
    },
    ...current.context.coordinates
  ];
  setCoordinatesToTransform(current.context.coordinates);
  return coordinatesToTransform;
}
