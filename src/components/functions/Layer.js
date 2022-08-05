import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import TileLayer from "@arcgis/core/layers/TileLayer";
import { ElMessage } from "element-plus";

const serviceType = {
  0: "Dynamic",
  1: "TileLayer",
};
/**
 * 根据serviceType添加图层, 当发布服务的arcgis server版本 >= 10.6时不需添加sublayers信息即有默认弹出模板
 * @param {serviceType, url, id?, title?, sublayers?} layer
 * @returns layer
 */
export default function addLayer(layer) {
  switch (serviceType[layer.serviceType]) {
    case "Dynamic": {
      return new MapImageLayer(layer);
    }
    case "TileLayer": {
      return new TileLayer(layer);
    }
    default: {
      ElMessage({
        message: "图层加载出错，请检查类型。",
        type: "warning",
      });
      return;
    }
  }
}
