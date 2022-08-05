<template>
  <el-button>
    <el-icon :size="20" @click="() => (showDialog = true)"
      ><position
    /></el-icon>
  </el-button>
  <el-dialog v-model="showDialog" title="定位" width="15%">
    <span :style="{ 'line-height': '40px' }">
      <el-space wrap>
        <el-row>
          <el-col :span="6">经度: </el-col>
          <el-col :span="18"
            ><el-input-number
              v-model="x"
              :max="90"
              :min="-90"
              controls-position="right"
          /></el-col>
        </el-row>
        <el-divider />
        <el-row>
          <el-col :span="6">纬度: </el-col>
          <el-col :span="18"
            ><el-input-number
              v-model="y"
              :max="90"
              :min="-90"
              controls-position="right"
          /></el-col>
        </el-row>
      </el-space>
    </span>
    <template #footer>
      <el-button @click="showDialog = false">Cancel</el-button>
      <el-button type="primary" @click="goTo">Go</el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "GoPosition",
  data() {
    return {
      showDialog: false,
      x: 0,
      y: 0,
    };
  },
  methods: {
    goTo() {
      window.view.goTo({
        center: [this.x, this.y],
      });
    },
  },
};
</script>

<style lang="less" scoped></style>
