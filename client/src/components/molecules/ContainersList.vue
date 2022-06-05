<template>
  <div class="list-title" @click="toggleList()">
    <div>{{ listTitle }}</div>
    <div :id="arrowId" class="arrow">▲</div>
  </div>
  <div :id="listId" :class="listClasses">
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
import ContainerItem from "@/components/molecules/ContainerItem.vue";
import { ContainerListType } from "@/types";

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
    listType: {
      type: ContainerListType,
      required: true,
    },
    filterBy: {
      type: Function,
      required: true,
    },
  },
  computed: {
    listId() {
      return `containers-list-${this.listType}`;
    },
    arrowId() {
      return `arrow-${this.listType}`;
    },
    listClasses(){
      return {
        'containers-list': true,
        'ignored': this.listType === 'Ignored',
      }
    },
    listTitle() {
      return this.listType;
    },
    containers() {
      return _.pickBy(store.state.containers, this.filterBy);
    },
  },
  methods: {
    toggleList() {
      this.isListCollapsed = !this.isListCollapsed;

      document.getElementById(this.listId).style.maxHeight = this
        .isListCollapsed
        ? "0px"
        : "100vh";

      document.getElementById(this.arrowId).style.transform = this
        .isListCollapsed
        ? "rotateX(180deg)"
        : "rotateX(0deg)";
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
.arrow {
  transition: 0.3s ease-in-out;
}

.ignored {
  opacity: 0.3;
}
</style>
