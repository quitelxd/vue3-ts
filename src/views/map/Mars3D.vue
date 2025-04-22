<template>
    <div id="mars3dContainer" class="mars3d-container"></div>
</template>

<script setup>
import { onMounted } from "vue"
// 引入css
import "mars3d-cesium/Build/Cesium/Widgets/widgets.css"
import "mars3d/mars3d.css" // v3.8.6及之前版本使用 import "mars3d/dist/mars3d.css";

import * as mars3d from "mars3d"
import "mars3d-space" // 导入mars3d插件，导入即可，自动注册（按需使用，需要先npm install mars3d-space）
// import "mars3d-heatmap"; // 其他插件类型，自行修改名称

const Cesium = mars3d.Cesium



onMounted(() => {
    // Map的参数请看API文档：http://mars3d.cn/api/Map.html
    const map = new mars3d.Map("mars3dContainer", {
        basemaps: [{ name: "天地图", type: "tdt", layer: "img_d", show: true }]
    })
})

</script>