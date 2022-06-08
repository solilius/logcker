<template>
  <div class="section">
    <div class="containers-title">Containers</div>
    <SearchContainer :updateSearchTerm="updateSearchTerm" />
    <ContainersList listType="Listening" :filterBy="filteredByListening" />
    <ContainersList listType="Ignored" :filterBy="filteredByIgnored" />
  </div>
</template>

<script>
import ContainersList from "@/components/molecules/ContainersList.vue";
import SearchContainer from "@/components/atoms/SearchContainer.vue";

export default {
  name: "ContainersSection",
  components: {
    ContainersList,
    SearchContainer,
  },
  data() {
    return {
      searchTerm: "",
    };
  },
  methods: {
    filteredByListening(container, containerName) {
      return container.isListening && containerName.includes(this.searchTerm);
    },
    filteredByIgnored(container, containerName) {
      return !container.isListening && containerName.includes(this.searchTerm);
    },
    updateSearchTerm(event) {
      this.searchTerm = event.target.value;
    },
  },
};
</script>

<style lang="scss" scoped>
.section {
  background: rgb(28, 28, 28);
  height: 100vh;
  overflow-x: hidden;
}
.containers-title {
  margin: 16px;
  color: white;
  font-size: 22px;
  font-weight: 600;
  text-align: center;
}
</style>
