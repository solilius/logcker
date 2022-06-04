<template>
  <div class="componet">
    <div class="title">{{ containerName }}</div>

    <div class="container-view">
      <div class="log" v-for="log in logs" :key="log.timestamp">
        <div class="timestamp">{{ formatDate(log.timestamp) }}</div>
        <VueJsonPretty
          :data="log.data"
          :highlightSelectedNode="false"
        ></VueJsonPretty>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
export default {
  name: "LogsViewer",
  components: {
    VueJsonPretty,
  },
  props: {
    containerName: {
      type: String,
      require: true,
    },
  },
  computed: {
    logs() {
      return store.state.containers[this.containerName]?.logs;
    },
  },
  methods: {
    formatDate(timestamp) {
      return new Date(timestamp).toISOString().split("T")[1].split("Z")[0];
    },
  },
};
</script>

<style lang="scss">

.componet {
  border: solid 1px grey;
}

.title {
  height: 2.5vh;
  padding: 14px;
  color: white;
  font-size: 20px;
  background: #222121;
}

.container-view {
  width: 42vw;
  height: 44.5vh;
  background: black;
  overflow-y: auto;

  .log {
    display: flex;
    padding: 16px 16px 32px 16px;
    border-bottom: 1px gray;
    border-bottom-style: outset;

    .timestamp {
      color: blue;
      font-size: 16px;
      margin-right: 8px;
    }
    // overwrite the white background of logs when hovering
    // had to remove 'scoped' from  <style>
    div:hover {
      background: black;
    }
  }
}
</style>
