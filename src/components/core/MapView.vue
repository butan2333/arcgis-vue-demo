<template>
  <div id="viewDiv">
    <el-button-group id="widgetsGroup">
      <click-location/>
      <enable-remark/>
      <go-position/>
    </el-button-group>
  </div>
</template>

<script>
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import ClickLocation from '../widgets/ClickLocate.vue';
import EnableRemark from '../widgets/EnableRemark.vue';
import GoPosition from '../widgets/GoPosition.vue';
import addLayer from '@/components/functions/Layer'
import serviceConfig from "@/config/ServiceConfig";
import mapConfig from '@/config/MapConfig'
export default {
  components: { ClickLocation, EnableRemark, GoPosition },
  name: "MapView",
  mounted() {
    const layer = addLayer(mapConfig.basemap);
    const map = new Map({
      basemap: {
        baseLayers: layer,
      },
    });
    const view = new MapView({
      map,
      container: "viewDiv",
      zoom: mapConfig.zoom,
      center: mapConfig.center,
    });
    view.ui.remove("zoom");
    view.ui.remove("attribution");
    for (const service in serviceConfig) {
      const serviceLayer = addLayer(serviceConfig[service]);
      map.add(serviceLayer);
    }
    
    view.popup.defaultPopupTemplateEnabled = true;
    view.ui.add(document.getElementById("widgetsGroup"), 'top-left')
    window.view = view
    window.map = map
  }
};
</script>

<style scoped>
@import "@arcgis/core/assets/esri/themes/light/main.css";

#viewDiv {
  width: 100%;
  height: 100%;
}
</style>
