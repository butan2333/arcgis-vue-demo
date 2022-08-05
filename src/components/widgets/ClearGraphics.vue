<template>
  <el-button @click="onClick">
    <el-icon :size="20"><RemoveFilled /></el-icon>
  </el-button>
</template>

<script>
export default {
  name: "ClearGraphics",
  methods: {
    onClick() {
      window.view.graphics.removeAll();
    },
  },
};
</script>

<style></style>
