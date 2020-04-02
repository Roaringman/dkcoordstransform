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

  const newCoordinatesToTransform = [
    {
      sourceCoords: coordinate,
      destinationCoords: null,
      displayCoords: null,
      responseState: null,
      id: generateRandomID(8)
    },
    ...coordinatesToTransform
  ];
  setCoordinatesToTransform(newCoordinatesToTransform);
  return coordinatesToTransform;
}
