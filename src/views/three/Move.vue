<template>
    <div class="threeBox" ref="threeBox">
        <div class="controls">
            <el-button size="small" @click="playIdle">待机</el-button>
            <el-button size="small" @click="playWalk">走路</el-button>
            <el-button size="small" @click="playRun">跑步</el-button>
            <el-button size="small" @click="resetPosition">重置位置</el-button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js'

const scene = new THREE.Scene()
const threeBox = ref()
const isPlaying = ref(false)
let camera, renderer, controls
let mixer = null // 动画混合器
let model = null // 存储模型引用
let modelInitialPosition = new THREE.Vector3()
let clock = new THREE.Clock()

// 存储不同的动画动作
let currentAction = null
let actions = new Map()

// 移动速度
const SPEEDS = {
    walk: 0.03,
    run: 0.08
}

onMounted(() => {
    init()
})

function init() {
    // 创建相机
    camera = new THREE.PerspectiveCamera(75, threeBox.value.clientWidth / threeBox.value.clientHeight, 0.1, 1000)
    camera.position.z = 5

    // 创建渲染器
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    })
    renderer.setSize(threeBox.value.clientWidth, threeBox.value.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.outputEncoding = THREE.sRGBEncoding
    threeBox.value.appendChild(renderer.domElement)

    // 添加轨道控制器
    controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05

    // 设置场景背景色为浅灰色
    scene.background = new THREE.Color(0xf0f0f0)

    // 添加环境光和平行光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5)
    directionalLight.position.set(5, 5, 5)
    directionalLight.castShadow = true
    scene.add(directionalLight)

    // 添加更大的地面
    const groundGeometry = new THREE.PlaneGeometry(50, 50)
    const groundMaterial = new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        roughness: 0.8,
        metalness: 0.2
    })
    const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    scene.add(ground)

    // 加载模型
    const manager = new THREE.LoadingManager()
    manager.onProgress = (url, itemsLoaded, itemsTotal) => {
        console.log(`正在加载：${url}，进度：${(itemsLoaded / itemsTotal * 100).toFixed(2)}%`)
    }

    const loader = new FBXLoader(manager)
    loader.load('./threeModels/PainGesture.fbx', (fbx) => {
        console.log('模型加载完成：', fbx)
        model = fbx
        
        // 调整模型大小
        const box = new THREE.Box3().setFromObject(fbx)
        const size = box.getSize(new THREE.Vector3())
        const maxDim = Math.max(size.x, size.y, size.z)
        const scale = 2 / maxDim
        fbx.scale.setScalar(scale)
        
        // 启用阴影
        fbx.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true
                child.receiveShadow = true
            }
        })

        // 将模型放置在地面上
        const adjustedBox = new THREE.Box3().setFromObject(fbx)
        const bottomY = adjustedBox.min.y
        fbx.position.y -= bottomY
        modelInitialPosition.copy(fbx.position)

        scene.add(fbx)

        // 创建动画混合器
        mixer = new THREE.AnimationMixer(fbx)
        
        // 获取所有动画
        const animations = fbx.animations
        if (animations && animations.length > 0) {
            console.log('可用动画数量：', animations.length)
            
            // 为每个动画创建动作
            animations.forEach((clip, index) => {
                const action = mixer.clipAction(clip)
                actions.set(`animation_${index}`, action)
                console.log(`动画 ${index}: 持续时间 ${clip.duration}秒`)
            })

            // 默认播放第一个动画
            currentAction = actions.get('animation_0')
            if (currentAction) {
                currentAction.play()
            }
        }

        // 自动调整相机位置
        adjustCameraToModel(fbx)
    })

    // 动画循环
    function animate () {
        // 1. 预约下一帧的执行
        // 这确保了动画会持续进行
        // 浏览器会在下一次屏幕刷新时调用 animate
        requestAnimationFrame(animate)

        // 2. 更新场景中的状态
        // 更新相机控制器（处理用户的鼠标/触摸操作）
        controls.update()
        
        // 3. 更新模型动画
        if (mixer) {
            // 获取上一帧到当前帧的时间间隔（秒）
            const delta = clock.getDelta()
            // 根据时间间隔更新动画
            // 这确保了动画速度不受帧率影响
            mixer.update(delta)
        }
        
        // 4. 渲染新的一帧
        // 使用当前相机的视角渲染整个场景
        renderer.render(scene, camera)
    }

    // 启动动画循环
    animate()

    // 窗口大小改变时更新渲染
    window.addEventListener('resize', onWindowResize, false)
}

// 自动调整相机位置
function adjustCameraToModel (model) {
    const box = new THREE.Box3().setFromObject(model)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())

    // 计算合适的相机距离
    const maxDim = Math.max(size.x, size.y, size.z)
    const fov = camera.fov * (Math.PI / 180)
    let cameraZ = Math.abs(maxDim * 2 / Math.tan(fov / 2)) // 确保能看到完整模型

    // 设置相机位置在模型的斜上方
    camera.position.set(
        center.x,  // 稍微偏右
        center.y,  // 抬高视角
        center.z + cameraZ       // 主要的距离
    )

    // 让相机看向模型中心
    camera.lookAt(center)
    controls.target.copy(center)

    // 更新控制器
    controls.update()
}

// 窗口大小改变处理
function onWindowResize () {
    if (camera && renderer) {
        camera.aspect = threeBox.value.clientWidth / threeBox.value.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(threeBox.value.clientWidth, threeBox.value.clientHeight)
    }
}

// 切换动画
function switchToAnimation(index, fadeTime = 0.5) {
    if (!actions.has(`animation_${index}`)) return
    
    const newAction = actions.get(`animation_${index}`)
    if (currentAction === newAction) return

    // 淡出当前动画，淡入新动画
    if (currentAction) {
        currentAction.fadeOut(fadeTime)
    }
    newAction.reset().fadeIn(fadeTime).play()
    currentAction = newAction
}

// 播放待机动画
function playIdle() {
    switchToAnimation(0) // 假设待机是第一个动画
}

// 播放走路动画
function playWalk() {
    switchToAnimation(1) // 假设走路是第二个动画
}

// 播放跑步动画
function playRun() {
    switchToAnimation(2) // 假设跑步是第三个动画
}

// 重置位置
function resetPosition () {
    if (model) {
        model.position.copy(modelInitialPosition)
        adjustCameraToModel(model)
    }
}
</script>

<style lang="less">
.threeBox {
    height: calc(100% - 30px);
    position: relative;
}

.controls {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 100;
    display: flex;
    gap: 10px;
}
</style>