const dragAndDropHandlers = {
  dropHandler(ev, setCoordinatesToTransform, coordinatesToTransform) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (ev.dataTransfer.items[i].kind === "file") {
          var file = ev.dataTransfer.items[i].getAsFile();
          file
            .text()
            .then(text => text.split("\r\n"))
            .then(arr => arr.map(item => item.split(",")))
            .then(items => {
              let coordsToAdd = [];
              items.map(coordPair => {
                if (coordPair.length === 2) {
                  return coordsToAdd.push({
                    sourceCoords: [coordPair[0], coordPair[1]],
                    id: Math.floor(Math.random() * Math.floor(9999))
                  });
                }
              });
              return coordsToAdd;
            })
            .then(coordsToAdd => {
              setCoordinatesToTransform([
                ...coordinatesToTransform,
                ...coordsToAdd
              ]);
            });
        }
      }
    } /*else {
            // Use DataTransfer interface to access the file(s)
            for (var i = 0; i < ev.dataTransfer.files.length; i++) {
              ev.dataTransfer.files[i].text().then(text => console.log(text));
            }
          }*/
  },

  dragOverHandler(ev) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  }
};

export default dragAndDropHandlers;
