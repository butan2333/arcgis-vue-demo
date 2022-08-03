<template>
  <el-button @click="onClick">
    <el-icon :size="20"><edit-pen /></el-icon>
  </el-button>
</template>

<script>
import Draw from '@arcgis/core/views/draw/Draw'
import Graphic from '@arcgis/core/Graphic'
export default {
  name: 'EnableRemark',
  data() {
    return {
      onDraw: false,
      symbol: {
        type: "simple-line", 
        color: "red",
        width: "2px",
        style: 'solid'
      }
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
        symbol: me.symbol
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
    }
  }
}
</script>

<style lang="less" scoped>
</style>