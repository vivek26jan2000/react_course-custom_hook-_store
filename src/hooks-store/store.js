const { useEffect } = require("react");
const { useState } = require("react");

let globelState = {};
let listeners = [];
let actions = {};

const useStore = (storeListener = true) => {
  const setStore = useState(globelState)[1];

  const dispatch = (actionIdentifier, payload) => {
    const newState = actions[actionIdentifier](globelState, payload);
    globelState = { ...globelState, ...newState };
    for (const listener of listeners) {
      listener(globelState);
    }
  };

  useEffect(() => {
    if (storeListener) {
      listeners.push(setStore);
    }

    return () => {
      if (storeListener) {
        listeners = listeners.filter((li) => li !== setStore);
      }
    };
  }, [setStore, storeListener]);

  return [globelState, dispatch];
};

export const initStore = (usersAction, intialState) => {
  if (intialState) {
    globelState = { ...globelState, ...intialState };
  }
  actions = { ...actions, ...usersAction };
};

export default useStore;
