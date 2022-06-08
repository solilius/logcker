<template>
  <div class="componet">
    <div class="viewer-header">
      <div class="title">{{ containerName }}</div>
      <div class="auto-scroll-switch-box">
        <span>Auto Scroll</span>
        <SwitchaCheckbox :value="!!isSticky" @click="isStickyClicked()" />
      </div>
    </div>

    <div :id="viewerId" class="container-view">
      <div class="log" v-for="log in logs" :key="log.timestamp">
        <div class="timestamp">{{ formatDate(log.timestamp) }}</div>
        <VueJsonPretty
          :data="log.data"
          :highlightSelectedNode="false"
        ></VueJsonPretty>
      </div>
    </div>
  </div>
</template>

<script>
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
import store from "@/store";
import { ContainerProps } from "@/types";
import SwitchaCheckbox from "@/components/atoms/SwitchaCheckbox.vue";

export default {
  name: "LogsViewer",
  components: {
    VueJsonPretty,
    SwitchaCheckbox,
  },
  props: {
    containerName: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      scrollSbuscriber: undefined,
    };
  },
  created() {
    this.autoScroll();
  },
  computed: {
    viewerId() {
      return `${this.containerName}-viewer`;
    },
    logs() {
      return store.state.containers[this.containerName]?.logs;
    },
    isSticky() {
      return store.state.containers[this.containerName].isSticky;
    },
  },
  methods: {
    formatDate(timestamp) {
      return new Date(timestamp).toISOString().split("T")[1].split("Z")[0];
    },
    isStickyClicked() {
      store.commit("toggleProp", {
        containerName: this.containerName,
        prop: ContainerProps.isSticky,
        value: !store.state.containers[this.containerName]?.isSticky,
      });

      this.autoScroll();
    },
    autoScroll() {
      const SCROLL_MARGIN = 400;
      if (this.isSticky) {
        let objDiv = document.getElementById(this.viewerId);
        this.scrollSbuscriber = store?.subscribeAction(
          (payload) => {
            if (payload.type === "processLog") {
              if (!objDiv) {
                objDiv = document.getElementById(this.viewerId);
              }

              if (
                objDiv &&
                objDiv.scrollTop > objDiv.scrollHeight - SCROLL_MARGIN
              ) {
                // scroll to bottom of the div
                objDiv.scrollTop = objDiv.scrollHeight;
              }
            }
          },
          { prepend: true }
        );
      } else {
        // will unsubscribe handler
        this.scrollSbuscriber?.call();
      }
    },
  },
};
</script>

<style lang="scss">
.componet {
  border: solid 1px grey;
  width: 42vw;

  .viewer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 5vh;
    padding: 0 12px;
    background: #222121;

    .auto-scroll-switch-box {
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        color: grey;
        margin-left: 4px;
        font-size: 12px;
      }
    }
  }

  .title {
    padding: 14px;
    color: white;
    font-size: 20px;
  }

  .container-view {
    height: 45vh;
    background: black;
    overflow-y: auto;
    scrollbar-width: none; /* Firefox */

    .log {
      display: flex;
      padding: 16px 16px 32px 16px;
      border-bottom: 1px gray;
      border-bottom-style: outset;

      .timestamp {
        color: blue;
        font-size: 16px;
        margin-right: 8px;
      }
      // overwrite the white background of logs when hovering
      // had to remove 'scoped' from  <style>
      div:hover {
        background: black;
      }
    }
  }
  .container-view::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
}
</style>