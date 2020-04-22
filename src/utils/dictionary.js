export const dictionary = {
  breddegrad: "Latitude",
  længdegrad: "Longitude",
  easting: "Easting",
  westing: "Westing",
  northing: "Northing",
  ellipsoidehøjde: "Ellipsoidal Height",
  kote: "Elevation",
  dk: "Denmark",
  gl: "Greenland",
  global: "Global",
};

export function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}
