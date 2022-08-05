<template>
  <el-popover trigger="click" :width="200">
    <template #reference>
      <el-button>
        <el-icon :size="20"><place /></el-icon>
      </el-button>
    </template>
    <div class="content">
      <div v-for="(value, key) in content" :key="key" @click="goTo(value)">
        <el-link type="primary">{{ key }}</el-link>
      </div>
    </div>
  </el-popover>
</template>

<script>
const content = {
  test1: {
    zoom: 10,
    center: [119, 34],
  },
};
export default {
  name: "ClickLocate",
  data() {
    return {
      content,
    };
  },
  methods: {
    goTo(geoInfo) {
      window.view.goTo(geoInfo);
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  height: 300px;
  > div {
    width: 100%;
    line-height: 30px;
    font-size: 20px;
    text-align: center;
  }
}
</style>
