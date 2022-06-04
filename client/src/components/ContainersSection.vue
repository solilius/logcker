<template>
  <div class="section">
    <div class="containers-title">Containers</div>
    <ContainersList title="Listening" :filterBy="filteredByListening" />
    <ContainersList title="Ignored" :filterBy="filteredByIgnored" />
  </div>
</template>

<script>
import ContainersList from "@/components/ContainersList";

export default {
  name: "ContainersSection",
  components: {
    ContainersList,
  },
  methods: {
    filteredByListening(container) {
      return container.isListening;
    },
    filteredByIgnored(container) {
      return !container.isListening;
    },
  },
};
</script>

<style lang="scss" scoped>
.section {
  background: rgb(28, 28, 28);
  height: 100vh;
  overflow-y: auto;
}
.containers-title {
  margin: 16px;
  color: white;
  font-size: 22px;
  font-weight: 600;
}
</style>
