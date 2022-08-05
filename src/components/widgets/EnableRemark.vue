<template>
   <el-popover :visible="onDraw" popper-class="remark-popper" :width="150">
    <template #reference>
      <el-button @click="onClick">
        <el-icon :size="20"><edit-pen /></el-icon>
      </el-button>
    </template>
    <el-row>
      <el-col :span="18">
        <span :style="{'line-height': '24px'}">Choose Color:</span>
      </el-col>
      <el-col :span="6">
        <el-color-picker v-model="color" size="small" show-alpha :predefine="predefineColors" @active-change="activeChange"/>
      </el-col>
    </el-row>
    
  </el-popover>
</template>

<script>
import Draw from '@arcgis/core/views/draw/Draw'
import Graphic from '@arcgis/core/Graphic'
export default {
  name: 'EnableRemark',
  data() {
    return {
      onDraw: false,
      color: '#ff4500',
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
      ]
    }
  },
  methods: {
    onClick() {
      this.onDraw = !this.onDraw
      if (this.onDraw) {
        this.drawRemark()
      }
    },
    drawRemark() {
      const draw = new Draw({
        view: window.view
      })
      if (this.onDraw) {
        const action = draw.create('polyline', {
          mode: 'freehand'
        })
        action.on('vertex-add', evt => this.monitorDraw(draw, evt))
        action.on('cursor-update', evt => this.monitorDraw(draw, evt))
        action.on('draw-complete', evt => this.monitorDraw(draw, evt))
        action.on('vertex-remove', evt => this.monitorDraw(draw, evt))
      }
    },
    addGraphic(vertices) {
      const me = this
      const line = me.createLine(vertices)
      const graphic = new Graphic({
        geometry: line,
        symbol: {
          type: "simple-line", 
          color: this.color,
          width: "2px",
          style: 'solid'
        }
      })
      window.view.graphics.add(graphic)
    },
    createLine(vertices) {
      const polyline = {
        type: 'polyline', // autocasts as new Polyline()
        paths: vertices,
        spatialReference: window.view.spatialReference
      }
      return polyline
    },
    monitorDraw(draw, event) {
      if (this.onDraw) {
        this.addGraphic(event.vertices)
        if (event.type === 'draw-complete') {
          this.drawRemark()
        }
      } else {
        draw.reset()
      }
    },
    activeChange(color) {
      this.color = color
    },
  }
}
</script>

<style lang="less">
.remark-popper {
  width: 20px;
}
</style>
