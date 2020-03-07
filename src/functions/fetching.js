async function initializeSRS(state) {
  const stateAndData = { state: "", allSRS: [] };
  if (state.matches("initial")) {
    await fetch(
      "https://services.kortforsyningen.dk/rest/webproj/v1.0/crs/?token=8336526c09097038d0436ba18e95153b"
    )
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(SRSJson => {
        for (let [key, value] of Object.entries(SRSJson)) {
          stateAndData.allSRS.push(key);
          stateAndData.allSRS.push(value);
        }
        stateAndData.state = "LOADED";
      })
      .catch(error => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
        stateAndData.state = "FAILED";
      });
  }
  return stateAndData;
}

export default initializeSRS;
