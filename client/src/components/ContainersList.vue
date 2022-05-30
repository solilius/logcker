<template>
  <div class="containers-list">
    <div class="title">Containers</div>
    <div class="container" v-for="container in containers" :key="container">
    <div class="name"> {{ container }} </div>
    <div class="timestamp"> last log: {{ getLastLogTimestamp(container) }} </div>
      
    </div>
  </div>
</template>

<script>
import store from '../store';

export default {
  name: "ContainersList",
  computed: {
    containers() {
      return Object.keys(store.state.logsByContainer);
    },
  },
  methods: {
    getLastLogTimestamp(containerName){
      const container = store.state.logsByContainer[containerName]
      const { timestamp } =  container[container?.length - 1];

      return new Date(timestamp).toISOString().split('T')[1].split('Z')[0];
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
  margin: 8px;
  padding: 8px;

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
