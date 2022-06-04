<template>
  <div class="list-title" @click="toggleList()">
    <div>{{ listTitle }}</div>
    <div>{{ listArrowDirection }}</div>
  </div>
  <div :id="listId" class="containers-list">
    <ContainerItem
      v-for="(container, containerName) in containers"
      :key="containerName"
      :container="container"
      :containerName="containerName"
    />
  </div>
</template>

<script>
import store from "@/store";
import _ from "lodash";
import ContainerItem from "@/components/ContainerItem.vue";

export default {
  name: "ContainersList",
  components: {
    ContainerItem,
  },
  data() {
    return {
      isListCollapsed: false,
    };
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    filterBy: {
      type: Function,
      required: true,
    },
  },
  computed: {
    listId() {
      return `containers-list-${this.title}`;
    },
    listTitle() {
      return this.title;
    },
    containers() {
      return _.omitBy(store.state.containers, this.filterBy);
    },
    listArrowDirection() {
      return this.isListCollapsed ? "▲" : "▼";
    },
  },
  methods: {
    toggleList() {
      this.isListCollapsed = !this.isListCollapsed;
      document.getElementById(this.listId).style.maxHeight = this
        .isListCollapsed
        ? "0px"
        : "100vh";
    },
  },
};
</script>

<style lang="scss" scoped>
.list-title {
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  width: 90%;
  cursor: pointer;
  color: rgb(133, 133, 133);
  font-size: 16px;
  font-family: monospace;
}
.containers-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 15vw;
  max-height: 100vh;
  overflow-y: auto;
  transition: max-height 0.2s ease-in-out;
}
</style>
