import { assign, createMachine } from 'xstate';

type MachineActions = {
  type: "assignSpeedToContext"
} | {
  type: "showAlert"
}

type MachineEvents = {
  type: "USER_CLICK_ON";
} | {
  type: "USER_CLICK_OFF"
} | {
  type: "USER_CLICK_ADD_SPEED",
  data: {
    newSpeed: number
  }
} | {
  type: "USER_CLICK_DECREASE_SPEED",
  data: {
    newSpeed: number
  }
}

type MachineContext = {
  speed: number;
  maxSpeed: number;
  minSpeed: number;
}


const kipasAnginMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGsCWAHAhrAggOylTwDoB7AM3IGIBVAZQFEAlAfQGEAZASTYGkWA8gDlEodKVioALqlJ5RIAB6IAjAFYAzMRUqALAAYATBo27DKgJwAOFQBoQAT0QGVxXZqtWNAdkObD3t4AvkH2aFi4BERkJLDoRLSMrJw8-DgAIuksdAAKDAzpCuKSMnIKygiaWroWAGwW5mpWFrq13naOiG362rUGhq0aat5ewaEg4dj4hCRyxHEJ9Mzs3Hws6QxsTAw4jNl5BUUS0rLySEqImq61fhZq7mpq+uq19k4IDcRParW1VvoGbwmXRWEJhDBTKKzPCJZYpNYCABiiKOJVO5VUNWI3hBGmsnjx3gsALeiA0+h6tXJVKJgU0ul0IXGeFIEDgCkmkRmZEoqJOZXOFTMpIQGistWIRjxxnuFl8I0Z40502icwWZzEx1KGouCAZhmINzlw28z2BahFT282OJtX0agsJipFjBEwhXNVOuK-J1QpUVkNhmNgTNpgtnQQhh6anU+jD4v6tTUruVUL52oxCH9IoAtDG3N5HnTDM19N4-kygkA */
  createMachine({
    context: {
      speed: 1,
      maxSpeed: 9,
      minSpeed: 1
    },
    tsTypes: {} as import("./kipasAnginMachine.typegen").Typegen0,
    schema: { events: {} as MachineEvents, actions: {} as MachineActions, context: {} as MachineContext },
    id: "kipasAngin",
    initial: "off",
    states: {
      off: {
        on: {
          USER_CLICK_ON: {
            target: "on",
          },
        },
      },
      on: {
        initial: "spin",
        states: {
          spin: {
            on: {
              USER_CLICK_ADD_SPEED: [
                {
                  actions: "showAlert",
                  description:
                    "Ups! Kecepatan kipas angin sudah maksimal! Ga boleh ditambahin lagi.",
                  cond: "is at maximum speed?",
                },
                {
                  actions: "assignSpeedToContext",
                  description:
                    "Kecepatan kipas angin belum mencapai maksimal, boleh ditambahin lagi 🚀",
                },
              ],
              USER_CLICK_DECREASE_SPEED: [
                {
                  actions: "showAlert",
                  description:
                    "Ups! Kecepatan kipas angin udah minimum! Ga boleh diturunin lagi! ",
                  cond: "is at minimum speed?",
                },
                {
                  actions: "assignSpeedToContext",
                  description:
                    "Kecepatan kipas angin belum minimum, turun yuk 📉",
                },
              ],
            },
          },
        },
        on: {
          USER_CLICK_OFF: {
            target: "off",
          },
        },
      },
    },
  }, {
    actions: {
      assignSpeedToContext: assign((context, event) => {
        console.log("newspeed: ", event.data.newSpeed)
        return {
          speed: event.data.newSpeed
        }
      }),
    },
    guards: {
      "is at maximum speed?": (context, event) => {
        const newSpeed = event.data.newSpeed;
        return newSpeed > context.maxSpeed
      },
      "is at minimum speed?": (context, event) => {
        const newSpeed = event.data.newSpeed;
        return newSpeed < context.minSpeed
      }
    }
  })

export { kipasAnginMachine }