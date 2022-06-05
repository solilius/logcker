<template>
  <div class="app">
    <ContainersSection />
    <LogsSection />
  </div>
</template>

<script>
import { SocketConnection } from "@/services/socketio.service";
import ContainersSection from "@/components/organisms/ContainersSection.vue";
import LogsSection from "@/components/organisms/LogsSection.vue";

export default {
  name: "App",
  components: {
    ContainersSection,
    LogsSection,
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
