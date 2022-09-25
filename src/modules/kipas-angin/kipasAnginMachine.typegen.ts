// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: "showAlert";
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    assignSpeedToContext: "USER_CLICK_ADD_SPEED" | "USER_CLICK_DECREASE_SPEED";
    showAlert: "USER_CLICK_ADD_SPEED" | "USER_CLICK_DECREASE_SPEED";
  };
  eventsCausingServices: {};
  eventsCausingGuards: {
    "is at maximum speed?": "USER_CLICK_ADD_SPEED";
    "is at minimum speed?": "USER_CLICK_DECREASE_SPEED";
  };
  eventsCausingDelays: {};
  matchesStates: "off" | "on" | "on.spin" | { on?: "spin" };
  tags: never;
}
