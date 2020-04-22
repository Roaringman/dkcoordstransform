export async function initializeSRS(state) {
  const stateAndData = { state: "", allSRS: [] };
  if (state.matches("initial")) {
    await fetch(
      "https://services.kortforsyningen.dk/rest/webproj/v1.0/crs/?token=8336526c09097038d0436ba18e95153b"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((SRSJson) => {
        for (let [key, value] of Object.entries(SRSJson)) {
          stateAndData.allSRS.push(key);
          stateAndData.allSRS.push(value);
        }
        stateAndData.state = "LOADED";
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
        stateAndData.state = "FAILED";
      });
  }
  return stateAndData;
}

export function getSRSData(srs, target, setData) {
  if (srs.flat().includes(target)) {
    fetch(
      `https://services.kortforsyningen.dk/rest/webproj/v1.0/crs/${target}?token=8336526c09097038d0436ba18e95153b`
    )
      .then((response) => response.json())
      .then((dataJson) => {
        const filteredData = {
          Title: dataJson.title,
          Coverage: dataJson.country,
          X: dataJson.v1,
          Y: dataJson.v2,
          Z: dataJson.v3,
        };
        setData(filteredData);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }
}
