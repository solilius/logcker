<template>
  <input class="search" type="text" v-on:keyup="updateSearchTerm" placeholder="Filter Containers"/>
</template>

<script>
export default {
  name: "SwitchaCheckbox",
  props: {
    updateSearchTerm: {
      type: Function,
      required: true,
    },
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.search {
    border: solid 1px grey;
    border-radius: 4px;
    padding: 4px;
    background: rgb(60, 60, 60);
    text-align: center;
    color: white;
    width: 70%;
    height: 25px;
    margin-left: 15%;
    margin-bottom: 16px;
}
</style>
