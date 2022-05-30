import { createStore } from "vuex";
import type { Log, ContainerDictionary } from "../types";

const MAX_CONTAINER_LOGS = 1000;

// @ts-ignore
export default createStore({
  state: {
    logs: {} as ContainerDictionary,
    containersBlackList: [] as string[],
  },
  mutations: {
    addLog(state, log) {
      const containerName = log.origin;

      // setup an array for new container
      if (state.logs[containerName] === undefined) {
        state.logs[containerName] = [];
      }

      // make sure the memory isnt overflowing
      if (state.logs[containerName].length >= MAX_CONTAINER_LOGS) {
        state.logs[containerName].shift();
      }

      state.logs[containerName].push(log);
    },
  },
  actions: {
    processLog({ state }, log: Log) {
      if (!state.containersBlackList.includes(log?.origin)) {
        this.commit("addLog", log);
      }
    },
  },
  modules: {},
});
