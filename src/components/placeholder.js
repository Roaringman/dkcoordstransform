
      if (!current.matches("ready.transformed")) {
        for (const coord of coords) {
          if (coord.sourceCoords) {
            if (source === "EPSG:4326" && destination !== "EPSG:4326") {
              yield submitTranslateRequest(
                coord,
                source,
                destination,
                "destinationCoords",
                false
              );
            }
            if (destination === "EPSG:4326" && source !== "EPSG:4326") {
              coordinatesToTransform.displayCoords.push(coord.sourceCoords);
              yield submitTranslateRequest(
                coord,
                source,
                destination,
                "destinationCoords",
                false
              );
            }
            //If neither source or destination is EPSG:4326, fetch twice to get destination and said srs.
            if (destination !== "EPSG:4326" && source !== "EPSG:4326") {
              yield submitTranslateRequest(
                coord,
                source,
                destination,
                "destinationCoords",
                false
              );
            }

            await delay(100);
          }
        }

        for (const coord of coords) {
          if (
            coord.destinationCoords &&
            coord.destinationCoords[0] !== "undefined"
          ) {
            yield submitTranslateRequest(
              coord,
              destination,
              "EPSG:4326",
              "displayCoords",
              true
            );
          }
        }
      }