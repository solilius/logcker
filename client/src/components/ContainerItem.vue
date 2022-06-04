<template>
  <div :id="itemId" class="container">
    <div class="row">
      <div>
        <div class="container-name">{{ containerName }}</div>
        <div class="timestamp">
          last log: {{ getLastLogTimestamp(containerName) }}
        </div>
      </div>

      <div class="is-display-switch">
        <span>view</span>
        <input
          type="checkbox"
          v-model="isDisplayed"
          @click="toggleContainerDisplay(containerName)"
        />
      </div>
    </div>

    <div class="row" v-if="!isCollapsed"></div>
    <div class="arrow-collapse" :id="arrowId" @click="toggleItemCollaped()">▲</div>
  </div>
</template>

<script>
import { ContainerProps } from "@/types";
import store from "../store";

export default {
  name: "ContainerItem",
  data() {
    return {
      isCollapsed: true,
    };
  },
  props: {
    containerName: {
      type: String,
      required: true,
    },
  },
  computed: {
    itemId() {
      return `${this.containerName}-item`;
    },
    arrowId() {
      return `${this.containerName}-arrow`;
    },
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
    toggleItemCollaped() {
      this.isCollapsed = !this.isCollapsed;
      document.getElementById(this.arrowId).style.transform = this
        .isCollapsed
        ? "rotateX(180deg)"
        : "rotateX(0deg)";

      document.getElementById(this.itemId).style.minHeight = this.isCollapsed
        ? "65px"
        : "120px";
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 80%;
  min-height: 65px;
  border: solid 1px grey;
  border-radius: 4px;
  background-color: rgb(30, 30, 30);
  margin: 8px;
  padding: 8px;
  transition: min-height 0.2s ease-in-out;

  .row {
    display: flex;

    justify-content: space-between;
  }
  .is-display-switch {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: white;
  }
  .container-name {
    color: rgb(220, 217, 217);
    font-size: 16px;
  }

  .timestamp {
    color: rgb(157, 157, 157);
    font-size: 12px;
    margin-top: 4px;
  }
  .arrow-collapse {
    color: grey;
    font-size: 12px;
    padding-top: 8px;
    cursor: pointer;
    text-align: right;
    width: 100%;
    transition: .3s ease-in-out;
  }
}
</style>
