<template>
  <div class="app">
    <ContainersList/>
  </div>
</template>

<script>
import { SocketConnection } from "./services/socketio.service";
import ContainersList from "./components/ContainersList";

export default {
  name: "App",
  components: {
    ContainersList,
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
}

.app {
  display: flex;
  flex-direction: column;
}
</style>
