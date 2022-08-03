export default [
  {
    id: 1,
    serviceType: 0,
    url: 'https://zta1.sdmap.gov.cn:6443/arcgis/rest/services/SL/sd_sl/MapServer/',
    title: '水库',
    sublayers: [
      {
        id: 1,
        visible: true,
        popupEnabled: true,
        popupTemplate: {
          title: "{名称}",
          content: [{
            type: "fields",
            fieldInfos: [{
              fieldName: "水库类型"
            }, {
              fieldName: "建成年月"
            }, {
              fieldName: "流域"
            }, {
              fieldName: "水系"
            }, {
              fieldName: "所在河湖类型"
            }, {
              fieldName: "所在河流"
            }, {
              fieldName: "行政区划"
            }, {
              fieldName: "区划代码"
            }]
          }]
        },
      }
    ]
  }
]