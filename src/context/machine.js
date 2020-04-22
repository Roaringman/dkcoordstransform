import { Machine } from "xstate";

export const transformMachine = Machine(
  {
    id: "coordinateTransformMachine",
    initial: "initial",
    context: {
      sourceSrs: "32",
      destinationSrs: "",
      coords: false,
      coordinates: [],
      failMessage: "",
    },
    states: {
      initial: {
        entry: ["load"],
        on: {
          LOADED: {
            target: "ready",
          },
          FAILED: "failed",
        },
      },
      ready: {
        initial: "allinactive",
        states: {
          allinactive: {
            entry: ["reset"],
            on: {
              READYTOTRANSFORM: { target: "active", cond: "canTransform" },
              RESET: { target: "allinactive" },
            },
          },
          active: {
            on: {
              TRANSFORM: { target: "transforming" },
              RESET: { target: "allinactive" },
              FAILEDTOTRANSFORM: { target: "failedtotransform" },
            },
          },
          transforming: {
            on: {
              FAILEDTOTRANSFORM: { target: "failedtotransform" },
              SUCCESS: { target: "transformed" },
              TRANSFORM: { target: "transforming" },
            },
          },
          transformed: { on: { RESET: { target: "allinactive" } } },

          failedtotransform: {
            on: {
              RESET: { target: "allinactive" },
            },
          },
        },
      },

      failed: {},
    },
  },
  {
    guards: {
      canTransform: (context) =>
        context.sourceSrs !== "" &&
        context.destinationSrs !== "" &&
        context.coords === true,
    },
  }
);
