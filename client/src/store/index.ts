import { createStore } from "vuex";
import { Log, Containers, ContainerProps } from "../types";
import _ from "lodash";

const MAX_CONTAINER_LOGS = 100;
const LOCAL_STATE = "local-state";

// @ts-ignore
export default createStore({
  state: {
    containers: JSON.parse(
      localStorage.getItem(LOCAL_STATE) || "{}"
    ) as Containers,
    allLogs: [] as Log[],
  },
  mutations: {
    addLogToContainer({ containers, allLogs }, log) {
      const { origin: containerName, ...logData } = log;

      if (containers[containerName] === undefined) {
        containers[containerName] = {
          isListening: true,
          logs: [],
        };
      }

      const container = containers[containerName];

      if (container.logs?.length >= MAX_CONTAINER_LOGS) {
        container.logs?.shift();
      }

      if (allLogs.length >= MAX_CONTAINER_LOGS) {
        allLogs.shift();
      }

      allLogs.push(log);
      container.logs.push(logData);
    },

    toggleProp(state, data: { containerName: string; prop: ContainerProps, value: boolean }) {
      const { containerName, prop, value } = data;
      // @ts-ignore
      state.containers[containerName][prop] = value;

      _updateLocalStorage(state.containers);
    },
  },
  actions: {
    processLog({ state }, log: Log) {
      //filter out logs from filtered containers and accept from new containers
      if (
        state.containers[log?.origin] === undefined ||
        state.containers[log?.origin]?.isListening
      ) {
        this.commit("addLogToContainer", log);
      }
    },
  },
  modules: {},
});

function _updateLocalStorage(containers: Containers) {
  const containerWithoutLogs = {} as Containers;
  _.forOwn(containers, (value, key) => {
    containerWithoutLogs[key] = { ...value, logs: [] };
  });

  localStorage.setItem(LOCAL_STATE, JSON.stringify(containerWithoutLogs));
}
