<template>
  <div>
    <span
      class="toggle-wrapper"
      role="checkbox"
      :aria-checked="value.toString()"
      tabindex="0"
      @click="toggle"
      @keydown.space.prevent="toggle"
    >
      <span class="toggle-background" :style="backgroundColor" :class="backgroundStyles" />
      <span class="toggle-indicator" :style="indicatorStyles" />
    </span>
  </div>
</template>

<script>
export default {
  name: "SwitchaCheckbox",
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    color: {
      type: String,
      default: 'grey',
    }
  },
  computed: {
    backgroundColor (){
      return {backgroundColor: this.color}
    },

    backgroundStyles() {
      return {
        "state-on": this.value,
        "state-off": !this.value,
      };
    },
    indicatorStyles() {
      return { transform: this.value ? "translateX(14px)" : "translateX(0)" };
    },
  },
  methods: {
    toggle() {
      this.$emit("input", !this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.state-on {
    opacity: 1;
}

.state-off {
  opacity: 0.3;
}

.toggle-wrapper {
  display: inline-block;
  position: relative;
  cursor: pointer;
  width: 32px;
  height: 18px;
  border-radius: 9999px;
}

.toggle-wrapper:focus {
  outline: 0;
}

.toggle-background {
  display: inline-block;
  border-radius: 9999px;
  height: 100%;
  width: 100%;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.4s ease;
}

.toggle-indicator {
  position: absolute;
  height: 14px;
  width: 14px;
  left: 2px;
  bottom: 2px;
  background-color: #ffffff;
  border-radius: 9999px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.4s ease;
}
</style>
