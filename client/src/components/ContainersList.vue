<template>
  <div class="containers-list">
    <div class="title">Containers</div>
    <div class="container" v-for="(container, containerName) in containers" :key="container">
      <div class="name">{{ containerName }}</div>
      <div class="timestamp">
        last log: {{ getLastLogTimestamp(containerName) }}
      </div>
      <input
        type="checkbox"
        v-model="container.isDisplayed"
        @click="toggleContainerDisplay(containerName)"
      />
    </div>
  </div>
</template>

<script>
import { ContainerProps } from "@/types";
import store from "../store";

export default {
  name: "ContainersList",
  computed: {
    containers() {
      return store.state.containers;
    },
  },
  methods: {
    getLastLogTimestamp(containerName) {

      const container = store.state.containers[containerName]?.logs;
      if ( !container || container?.length === 0) {
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
.title {
  margin: 16px;
  color: white;
  font-size: 22px;
  font-weight: 600;
}

.containers-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 15vw;
  height: 100vh;
  background: rgb(28, 28, 28);
  overflow-y: auto;
}

.container {
  width: 80%;
  height: 60px;
  border: solid 1px grey;
  border-radius: 4px;
  background-color: rgb(30, 30, 30);
  margin: 8px;
  padding: 8px;
  cursor: pointer;

  .name {
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
