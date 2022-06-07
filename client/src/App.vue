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


/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #c1c0c0; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
  border-right: 1px #c1c0c0 solid;

}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}

</style>
