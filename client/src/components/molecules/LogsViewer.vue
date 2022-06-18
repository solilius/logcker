<template>
  <div class="componet">
    <div class="viewer-header">
      <div class="title">{{ containerName }}</div>
      <div class="header-right">
        <span>Auto Scroll</span>
        <SwitchaCheckbox :value="!!isSticky" @click="isStickyClicked()" />
        <div class="close-viewer" @click="closeViewer()">X</div>
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
      const container = store.state.containers[this.containerName];
      return container.filterTerm
        ? container.logs?.filter((l) => !l.data.includes(container.filterTerm))
        : container.logs;
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
    closeViewer() {
      store.commit("toggleProp", {
        containerName: this.containerName,
        prop: ContainerProps.isDisplayed,
        value: false,
      });
    },
    autoScroll() {
      const SCROLL_MARGIN = 500;
      if (this.isSticky) {
        let objDiv = document.getElementById(this.viewerId);
        (objDiv || {}).scrollTop = objDiv?.scrollHeight;
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
    height: 6vh;
    padding: 0 12px;
    background: #222121;

    .header-right {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .close-viewer {
        cursor: pointer;
        color: white;
        font-size: 16px;
        margin-left: 16px;
        font-family: fantasy;
      }
      .close-viewer:hover {
        transform: scale(1.2);
        transition: all 0.2s ease-in-out;
      }

      span {
        color: grey;
        margin-left: 4px;
        font-size: 12px;
      }
    }
  }

  .title {
    color: white;
    font-size: 22px;
    font-family: monospace;
  }

  .container-view {
    height: 44vh;
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
