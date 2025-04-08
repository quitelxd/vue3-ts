<template>
    <div id="cesiumContainer"></div>
</template>

<script setup>
import * as Cesium from 'cesium'
import "cesium/Build/Cesium/Widgets/widgets.css";
import { onMounted, onBeforeUnmount } from 'vue';
import { getBaseUrl } from '@/utils/env';

let viewer = null;

onMounted(async () => {
    // 初始化 viewer
    viewer = new Cesium.Viewer('cesiumContainer', {
        animation: false, // 动画小部件
        baseLayerPicker: false, // 图层选择器
        fullscreenButton: false, // 全屏按钮
        // geocoder: true, // 地理编码搜索工具
        // homeButton: true, // home按钮
        // infoBox: true, // 信息框
        sceneModePicker: false, // 场景模式选择器
        // selectionIndicator: true, // 选择指示器
        timeline: false, // 时间轴
        navigationHelpButton: false, // 导航帮助按钮
        // scene3DOnly: false, // 仅3D场景
    });

    // 设置默认视角 - 调整到更低的高度以便看到地形
    viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(
            116.39, // 经度
            39.9,   // 纬度
            5000    // 高度（米）
        ),
        orientation: {
            heading: Cesium.Math.toRadians(0.0), // 方向
            pitch: Cesium.Math.toRadians(-45.0), // 俯仰角
            roll: 0.0 // 翻滚角
        }
    });
    // 启用地形深度测试
    viewer.scene.globe.enableLighting = true;
    viewer.scene.globe.depthTestAgainstTerrain = true;
});

// 组件销毁时清理资源
onBeforeUnmount(() => {
    if (viewer) {
        viewer.destroy();
        viewer = null;
    }
});
</script>

<style scoped lang="less">
#cesiumContainer {
    width: 100%;
    height: 100%;
    background: #f0f0f0;
}
</style>