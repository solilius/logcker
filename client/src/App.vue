<template>
yo
  <div id="app">

  </div>
</template>

<script>
import { SocketConnection } from './services/socketio.service';

export default {
  name: 'App',
  components: {
  },
   created() {
    SocketConnection.setupSocketConnection();

  },
  beforeUnmount() {
    SocketConnection.disconnect();
  }
};
</script>

<style >
#app {
  direction: rtl;
  font-family: SimplerPro, 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: row;
  justify-content: center;
  -webkit-text-size-adjust: 100%;
  -moz-text-size-adjust: none;
  -ms-text-size-adjust: 100%;

}
</style>
