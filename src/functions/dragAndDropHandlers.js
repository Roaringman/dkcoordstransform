import addCordinatesToTranfrom from "./addCoordinatesToTransform";

const dragAndDropHandlers = {
  dropHandler: dropHandler,

  dragOverHandler(ev) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  },
};

function dropHandler(ev, props) {
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
          .then((text) => text.split("\r\n"))
          .then((arr) => arr.map((item) => item.split(",")))
          .then((items) => {
            let coordsToAdd = [];
            items.map((coordPair) => {
              const coordinate = [];
              if (
                coordPair.length === 2 &&
                parseFloat(coordPair[0]) &&
                parseFloat(coordPair[1])
              ) {
                coordinate.push(
                  parseFloat(coordPair[0]),
                  parseFloat(coordPair[1])
                );
              }
              if (coordPair.length === 3 && parseFloat(coordPair[2])) {
                props.current.context.height = true;
                coordinate.push(
                  parseFloat(coordPair[0]),
                  parseFloat(coordPair[1]),
                  parseFloat(coordPair[2])
                );
              }
              return coordsToAdd.push(coordinate);
            });
            return coordsToAdd;
          })
          .then((coordsToAdd) => {
            return coordsToAdd.map((coord, i) => {
              return setTimeout(function () {
                addCordinatesToTranfrom(null, props, ...coord);
              }, 1000 * i);
            });
          });
      }
    }
  } /*else {
          // Use DataTransfer interface to access the file(s)
          for (var i = 0; i < ev.dataTransfer.files.length; i++) {
            ev.dataTransfer.files[i].text().then(text => console.log(text));
          }
        }*/
}

export default dragAndDropHandlers;
