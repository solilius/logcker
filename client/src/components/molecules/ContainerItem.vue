<template>
  <div :id="itemId" class="container">
    <div class="row">
      <div>
        <div class="container-name">{{ containerName }}</div>
        <div class="timestamp">last log: {{ getLastLogTimestamp() }}</div>
      </div>

      <div class="is-display-switch">
        <SwitchaCheckbox
          :value="!!isDisplayed"
          color="deepskyblue"
          @click="toggleContainerDisplay()"
        />
        <span>view</span>
      </div>
    </div>
    <div class="arrow-collapse" :id="arrowId" @click="toggleItemCollaped()">
      ▽
    </div>
    <div class="hidden-shef">
      <div class="filter-container">
        <input
          class="filter"
          type="text"
          v-on:keyup="updateFilterTerm"
          placeholder="Filter out logs"
        />
      </div>
      <div class="shelf-row">
        <span class="shelf-span"> Listening </span>
        <SwitchaCheckbox
          :value="!isListening"
          color="red"
          @click="toggleContainerListening()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SwitchaCheckbox from "@/components/atoms/SwitchaCheckbox.vue";
import store from "@/store";

export default {
  name: "ContainerItem",
  components: {
    SwitchaCheckbox,
  },
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
    isListening() {
      return store.state.containers[this.containerName].isListening;
    },
  },
  methods: {
    getLastLogTimestamp() {
      const container = store.state.containers[this.containerName]?.logs;
      if (!container || container?.length === 0) {
        return "waiting...";
      }

      const { timestamp } = container[container?.length - 1];

      return new Date(timestamp).toISOString().split("T")[1].split("Z")[0];
    },
    updateFilterTerm(event) {
      store.commit("updateContainerFilterTerm", {
        containerName: this.containerName,
        term: event.target.value,
      });
    },

    toggleContainerDisplay() {
      store.dispatch("toggleIsDisplayed", this.containerName);
    },
    toggleContainerListening() {
      store.dispatch("toggleIsListening", this.containerName);
    },
    toggleItemCollaped() {
      this.isCollapsed = !this.isCollapsed;
      document.getElementById(this.arrowId).style.transform = this.isCollapsed
        ? "rotateX(0deg)"
        : "rotateX(180deg)";

      document.getElementById(this.itemId).style.height = this.isCollapsed
        ? "60px"
        : "140px";
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
  height: 60px;
  overflow: hidden;
  border: solid 1px grey;
  border-radius: 4px;
  background-color: rgb(30, 30, 30);
  margin: 8px;
  padding: 8px;
  transition: height 0.2s ease-in-out;

  .hidden-shelf {
    display: flex;
    flex-direction: column;
  }
  .row {
    display: flex;
    justify-content: space-between;
  }
  .shelf-row {
    display: flex;

    .shelf-span {
      color: rgb(211, 211, 211);
      margin-right: 8px;
      font-size: 14px;
    }
  }

  .is-display-switch {
    display: flex;
    flex-direction: column;
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
    transition: 0.3s ease-in-out;
  }

  .filter-container {
    display: flex;
    justify-content: center;
    width: 100%;

    .filter {
      height: 16px;
      width: 95%;
      padding: 4px;
      margin: 16px;
      text-align: center;
      border: solid 1px grey;
      border-radius: 4px;
      color: white;
      background: #3c3c3c;
      font-size: 12px;
    }
  }
}
</style>
