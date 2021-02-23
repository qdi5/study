<template>
  <div class="test">
    <button @click="closeSelf">关闭</button>
  </div>
</template>

<script>
export default {
  methods: {
    closeSelf() {
      this.$emit("close");
    }
  }
};
</script>

<style>
.test {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: blue;
  z-index: 6670;
}
</style>