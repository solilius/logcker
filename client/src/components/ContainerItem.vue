<template>
  <div class="container">
    <div class="container-name">{{ containerName }}</div>
    <div class="timestamp">
      last log: {{ getLastLogTimestamp(containerName) }}
    </div>
    <input
      type="checkbox"
      v-model="isDisplayed"
      @click="toggleContainerDisplay(containerName)"
    />
  </div>
</template>

<script>
import { ContainerProps } from "@/types";
import store from "../store";

export default {
  name: "ContainerItem",
  props: {
    containerName: {
      type: String,
      required: true,
    },
  },
  computed: {
    isDisplayed() {
      return store.state.containers[this.containerName].isDisplayed;
    },
  },
  methods: {
    getLastLogTimestamp(containerName) {
      const container = store.state.containers[containerName]?.logs;
      if (!container || container?.length === 0) {
        return "waiting...";
      }

      const { timestamp } = container[container?.length - 1];

      return new Date(timestamp).toISOString().split("T")[1].split("Z")[0];
    },
    toggleContainerDisplay(container) {
      store.commit("toggleProp", {
        containerName: container,
        prop: ContainerProps.isDisplayed,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 80%;
  height: 60px;
  border: solid 1px grey;
  border-radius: 4px;
  background-color: rgb(30, 30, 30);
  margin: 8px;
  padding: 8px;
  cursor: pointer;

  .container-name {
    color: rgb(220, 217, 217);
    font-size: 16px;
  }

  .timestamp {
    color: rgb(157, 157, 157);
    font-size: 12px;
    margin-top: 4px;
  }
}
</style>
