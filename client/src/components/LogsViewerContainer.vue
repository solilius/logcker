<template>
  <div class="containers">
    <div v-for="container in containers" :key="container">
      <LogsViewer :containerName="container" />
    </div>
  </div>
</template>

<script>
import store from "../store";
import * as _ from "lodash";
import LogsViewer from "./LogsViewer.vue";

export default {
  name: "LogsViewerContainer",
  components: {
    LogsViewer,
  },
  computed: {
    containers() {
      return Object.keys(
        _.pickBy(store.state.containers, (c) => c.isDisplayed)
      );
    },
  },
  methods: {},
};
</script>

<style lang="scss"  >
.containers {
  display: flex;
  width: 85vw;
  height: 100vh;
  flex-wrap: wrap;
}
</style>
