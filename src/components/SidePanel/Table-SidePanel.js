import React, { useContext } from "react";
import { AnimatePresence } from "framer-motion";

//Import context
import { CoordinateContext } from "../../context/CoordinateContext";
import { SRSContext } from "../../context/SRSContext";

//Import components
import CoordinateLI from "./CoordinateLI";

//Import utils
import { dictionary } from "../../utils/dictionary";

//Import styles
import {
  Table,
  TableHD,
  CloseButton,
  TableRow,
  RemoveRowH,
  CenteredH2,
} from "./StylesSidePanel/SidePanelElements";

function TableSidePanel(props) {
  const { current, ZChecked } = props;

  const { coordinatesToTransform, setCoordinatesToTransform } = useContext(
    CoordinateContext
  );
  const { sourceData } = useContext(SRSContext);

  const remove = (arr, item) => {
    const newArr = [...arr];
    newArr.splice(
      newArr.findIndex((i) => i.id === item),
      1
    );
    if (newArr.length === 0) {
      current.context.coords = false;
    }
    return newArr;
  };

  switch (true) {
    case current.matches("ready.failedtotransform"):
      return <p>{current.context.failMessage}</p>;

    case coordinatesToTransform.length === 0:
      return <CenteredH2>Add coordinates to transform</CenteredH2>;

    default:
      return (
        <Table>
          <tbody>
            <tr>
              <RemoveRowH> </RemoveRowH>
              <TableHD>
                {sourceData.X
                  ? dictionary[sourceData["X"].toLowerCase()]
                  : "Longitude"}
              </TableHD>
              <TableHD>
                {sourceData.Y
                  ? dictionary[sourceData["Y"].toLowerCase()]
                  : "Latitude"}
              </TableHD>
              {ZChecked.current.checked ? (
                <TableHD>
                  {sourceData.Z
                    ? dictionary[sourceData["Z"].toLowerCase()]
                    : "Height"}
                </TableHD>
              ) : null}
            </tr>
            <AnimatePresence initial={true}>
              {coordinatesToTransform.map((coordinates, i) => {
                return (
                  <TableRow
                    key={coordinates.id}
                    positionTransition
                    initial={{ y: -50 }}
                    animate={{ y: 0 }}
                    exit={{
                      opacity: 0,
                      x: -50,
                      backgroundColor: "#e46464",
                      transition: { duration: 0.2 },
                    }}
                  >
                    <td>
                      <CloseButton
                        close={() => {
                          setCoordinatesToTransform(
                            remove(coordinatesToTransform, coordinates.id)
                          );
                        }}
                      />
                    </td>
                    <CoordinateLI
                      key={i}
                      coordinates={coordinates}
                      ZChecked={ZChecked.current.checked}
                    ></CoordinateLI>
                  </TableRow>
                );
              })}
            </AnimatePresence>
          </tbody>
        </Table>
      );
  }
}

export default TableSidePanel;
