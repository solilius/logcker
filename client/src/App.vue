<template>
  <div class="app">
    <ContainersList />
    <LogsViewerContainer />
  </div>
</template>

<script>
import { SocketConnection } from "./services/socketio.service";
import ContainersList from "./components/ContainersList";
import LogsViewerContainer from "./components/LogsViewerContainer";

export default {
  name: "App",
  components: {
    ContainersList,
    LogsViewerContainer,
  },
  created() {
    SocketConnection.setupSocketConnection();
  },
  beforeUnmount() {
    SocketConnection.disconnect();
  },
};
</script>

<style>
body {
  font-family: sans-serif;
  margin: 0;
  padding: 0;
  background: rgb(42, 42, 60);
}

.app {
  display: flex;
  flex-direction: row;
}
</style>
