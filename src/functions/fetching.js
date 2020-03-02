async function fetchSRS() {
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
      return allSRS;
    });
}

export default fetchSRS;
