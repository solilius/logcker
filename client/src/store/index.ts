import { createStore } from "vuex";
import type { Log, ContainerDictionary } from "../types";

const MAX_CONTAINER_LOGS = 10;

// @ts-ignore
export default createStore({
  state: {
    logsByContainer: {} as ContainerDictionary,
    allLogs: [] as Log[],
    containersBlackList: [] as string[],
  },
  mutations: {
    addLogToContainer({logsByContainer, allLogs}, log) {
      const containerName = log.origin;

      if (logsByContainer[containerName] === undefined) {
        logsByContainer[containerName] = [];
      }

      const container = logsByContainer[containerName];

      if (container?.length >= MAX_CONTAINER_LOGS) {
        container.shift();
      }

      if (allLogs.length >= MAX_CONTAINER_LOGS) {
        allLogs.shift();
      }

      allLogs.push(log);
      container.push(log);
    },
  },
  actions: {
    processLog({ state }, log: Log) {
      if (!state.containersBlackList.includes(log?.origin)) {
        this.commit("addLogToContainer", log);
      }
    },
  },
  modules: {},
});
