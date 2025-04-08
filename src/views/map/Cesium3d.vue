<template>
    <div id="cesiumContainer"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import { getBaseUrl } from '@/utils/env';
import * as Cesium from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";

// 确保 Cesium 在全局可用
window.Cesium = Cesium;

let viewer = null;

/**
 * 初始化地形提供者
 * @returns {Promise<Cesium.TerrainProvider>} 返回地形提供者实例
 */
async function initTerrainProvider() {
    return await Cesium.createWorldTerrainAsync({
        requestWaterMask: true,     // 启用水面效果
        requestVertexNormals: true  // 启用光照效果
    });
}

/**
 * 初始化 Cesium Viewer
 * @param {Cesium.TerrainProvider} terrainProvider - 地形提供者
 * @returns {Cesium.Viewer} 返回 viewer 实例
 */
function initViewer(terrainProvider) {
    return new Cesium.Viewer('cesiumContainer', {
        terrainProvider: terrainProvider,
        animation: true,           // 启用动画控件
        baseLayerPicker: false,    // 禁用图层选择器
        fullscreenButton: false,   // 禁用全屏按钮
        sceneModePicker: false,    // 禁用场景模式选择器
        timeline: true,            // 启用时间轴
        navigationHelpButton: false // 禁用帮助按钮
    });
}

/**
 * 创建 3D 模型实体
 * @param {Cesium.Resource} resource - 模型资源
 * @param {number} longitude - 经度
 * @param {number} latitude - 纬度
 * @param {number} height - 高度（米）
 * @returns {Cesium.Entity} 返回创建的实体
 */
function create3DModel(resource, longitude = 116.39, latitude = 39.9, height = 100) {
    return viewer.entities.add({
        name: "3D Model",
        position: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
        model: {
            uri: resource,
            minimumPixelSize: 128,  // 最小像素大小
            maximumScale: 20000     // 最大缩放比例
        }
    });
}

/**
 * 创建移动路径点
 * @param {number} centerLon - 中心点经度
 * @param {number} centerLat - 中心点纬度
 * @param {number} height - 高度（米）
 * @param {number} radius - 路径半径（度）
 * @returns {Array<Cesium.Cartesian3>} 返回路径点数组
 */
function createPathPositions(centerLon = 116.39, centerLat = 39.9, height = 100, radius = 0.01) {
    const positions = [];
    // 创建矩形路径的四个角点
    for (let i = 0; i <= 360; i += 90) {
        const position = Cesium.Cartesian3.fromDegrees(
            centerLon + Math.cos(i * Math.PI / 180) * radius,
            centerLat + Math.sin(i * Math.PI / 180) * radius,
            height
        );
        positions.push(position);
    }
    positions.push(positions[0]); // 闭合路径
    return positions;
}

/**
 * 设置时间轴参数
 * @param {number} duration - 动画持续时间（秒）
 * @param {number} multiplier - 时间流速倍数
 * @returns {Object} 返回时间相关参数
 */
function setupTimeRange(duration = 360, multiplier = 10) {
    const start = Cesium.JulianDate.fromDate(new Date());
    const stop = Cesium.JulianDate.addSeconds(start, duration, new Cesium.JulianDate());

    // 配置时间控制器
    viewer.clock.startTime = start.clone();
    viewer.clock.stopTime = stop.clone();
    viewer.clock.currentTime = start.clone();
    viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; // 循环播放
    viewer.clock.multiplier = multiplier;

    return { start, stop };
}

/**
 * 创建位置采样属性
 * @param {Array<Cesium.Cartesian3>} positions - 路径点数组
 * @param {Cesium.JulianDate} startTime - 开始时间
 * @param {number} secondsPerPoint - 每个点之间的时间间隔（秒）
 * @returns {Cesium.SampledPositionProperty} 返回位置采样属性
 */
function createPositionProperty(positions, startTime, secondsPerPoint = 90) {
    const positionProperty = new Cesium.SampledPositionProperty();
    positions.forEach((pos, i) => {
        const time = Cesium.JulianDate.addSeconds(startTime, i * secondsPerPoint, new Cesium.JulianDate());
        positionProperty.addSample(time, pos);
    });
    return positionProperty;
}

/**
 * 设置实体交互事件
 * @param {Cesium.Viewer} viewer - Cesium viewer 实例
 */
function setupEntityInteraction(viewer) {
    // 存储原始颜色
    const originalColor = Cesium.Color.WHITE;
    
    // 当前选中的实体
    let selectedEntity = null;

    // 鼠标移动事件处理
    viewer.screenSpaceEventHandler.setInputAction((movement) => {
        const pickedObject = viewer.scene.pick(movement.endPosition);
        
        // 恢复之前选中实体的颜色
        if (selectedEntity) {
            selectedEntity.model.color = originalColor;
            selectedEntity = null;
        }

        // 如果鼠标悬停在实体上
        if (Cesium.defined(pickedObject) && Cesium.defined(pickedObject.id)) {
            selectedEntity = pickedObject.id;
            // 改变模型颜色
            selectedEntity.model.color = Cesium.Color.YELLOW.withAlpha(0.8);
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    // 鼠标点击事件处理
    viewer.screenSpaceEventHandler.setInputAction((click) => {
        const pickedObject = viewer.scene.pick(click.position);
        console.log(pickedObject)
        
        if (Cesium.defined(pickedObject) && Cesium.defined(pickedObject.id)) {
            const entity = pickedObject.id;
            
            // 如果实体有名称，显示信息框
            console.log(entity.properties.id._value)
            if (entity.name) {
                const cartesian = viewer.scene.pickPosition(click.position);
                if (Cesium.defined(cartesian)) {
                    const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                    const longitude = Cesium.Math.toDegrees(cartographic.longitude);
                    const latitude = Cesium.Math.toDegrees(cartographic.latitude);
                    const height = cartographic.height;

                    // 创建信息框内容
                    const description = `
                        <table class="cesium-infoBox-defaultTable">
                            <tr><th>名称</th><td>${entity.name}</td></tr>
                            <tr><th>经度</th><td>${longitude.toFixed(6)}°</td></tr>
                            <tr><th>纬度</th><td>${latitude.toFixed(6)}°</td></tr>
                            <tr><th>高度</th><td>${height.toFixed(2)}米</td></tr>
                        </table>
                    `;

                    // 更新实体描述
                    entity.description = description;
                    
                    // 显示实体信息
                    viewer.selectedEntity = entity;
                }
            }
        } else {
            // 点击空白处，清除选择
            viewer.selectedEntity = undefined;
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    // 鼠标右键事件 - 停止/继续动画
    viewer.screenSpaceEventHandler.setInputAction((click) => {
        const pickedObject = viewer.scene.pick(click.position);
        
        if (Cesium.defined(pickedObject) && Cesium.defined(pickedObject.id)) {
            if (viewer.clock.shouldAnimate) {
                viewer.clock.shouldAnimate = false;
            } else {
                viewer.clock.shouldAnimate = true;
            }
        }
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
}

/**
 * 创建动画实体
 * @param {Cesium.Resource} resource - 模型资源
 * @param {Cesium.SampledPositionProperty} position - 位置属性
 * @param {Object} timeRange - 时间范围对象
 * @returns {Cesium.Entity} 返回创建的实体
 */
function createAnimatedEntity(resource, position, timeRange) {
    return viewer.entities.add({
        name: "动画模型",  // 添加名称
        availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
            start: timeRange.start,
            stop: timeRange.stop
        })]),
        position: position,
        orientation: new Cesium.VelocityOrientationProperty(position),
        properties:{
            id: "自定义id",
            type: 'column',
        },
        model: {
            uri: resource,
            minimumPixelSize: 128,
            maximumScale: 20000,
            color: Cesium.Color.WHITE,  // 添加默认颜色
            colorBlendMode: Cesium.ColorBlendMode.HIGHLIGHT  // 添加颜色混合模式
        },
        path: {
            resolution: 1,
            material: new Cesium.PolylineGlowMaterialProperty({
                glowPower: 0.1,
                color: Cesium.Color.YELLOW
            }),
            width: 10
        }
    });
}

onMounted(async () => {
    // 设置 Cesium ion token
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkMDc2Zjk4Mi0zNzE2LTQ1N2ItYmJiZi03MDBjNzE0OTRlN2UiLCJpZCI6MjI2NTIzLCJpYXQiOjE3NDQwODEyNzh9.ZB7sD_ip91ZAppy29yef0-8JFjpSPmtT3chRIZ44Gak';

    try {
        // 初始化地形和查看器
        const terrainProvider = await initTerrainProvider();
        viewer = initViewer(terrainProvider);

        if (!viewer) {
            throw new Error('Failed to initialize viewer');
        }

        // 加载3D模型资源
        const resource = await Cesium.IonResource.fromAssetId(2648381);

        // 创建动画路径
        const positions = createPathPositions();
        const timeRange = setupTimeRange();
        const positionProperty = createPositionProperty(positions, timeRange.start);

        // 创建动画实体
        const entity = createAnimatedEntity(resource, positionProperty, timeRange);

        // 设置实体交互
        setupEntityInteraction(viewer);

        // 将视角定位到实体
        viewer.zoomTo(entity);

        // 启用地形效果
        viewer.scene.globe.enableLighting = true;
        viewer.scene.globe.depthTestAgainstTerrain = true;

    } catch (error) {
        console.error('Error initializing scene:', error);
    }
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