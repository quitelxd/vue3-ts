<template>
    <div style="height: 100%;">
        <div class="buttonGroup">
            <el-button size="mini" @click="loadModel('one')">加载 机器人 模型</el-button>
            <span v-if="loading">加载中...</span>
            <span v-if="error" style="color: red;">{{ error }}</span>
        </div>
        <div ref="threeBox" class="threeBox">
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const scene = new THREE.Scene()
const threeBox = ref()
const loading = ref(false)
const error = ref('')
let camera, renderer, controls

onMounted(() => {
    initScene()
})

function initScene() {
    // 创建相机
    camera = new THREE.PerspectiveCamera(75, threeBox.value.clientWidth / threeBox.value.clientHeight, 0.1, 1000)
    camera.position.z = 5

    // 创建渲染器
    renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true  // 启用透明背景
    })
    renderer.setSize(threeBox.value.clientWidth, threeBox.value.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap  // 使用更柔和的阴影
    renderer.outputEncoding = THREE.sRGBEncoding  // 设置正确的颜色空间
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

    // 添加一个简单的立方体作为参考
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    // 动画循环
    function animate() {
        requestAnimationFrame(animate)
        controls.update()
        renderer.render(scene, camera)
        cube.rotation.x += 0.01
        cube.rotation.y += 0.01
    }

    animate()

    // 窗口大小改变时更新渲染
    window.addEventListener('resize', onWindowResize, false)
}

function onWindowResize() {
    if (camera && renderer) {
        camera.aspect = threeBox.value.clientWidth / threeBox.value.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(threeBox.value.clientWidth, threeBox.value.clientHeight)
    }
}

const loadModel = async (modelName) => {
    try {
        loading.value = true
        error.value = ''
        
        const loader = new GLTFLoader()
        // 使用相对路径加载模型
        const modelPath = modelName === 'face' ? './threeModels/face.glb' : './threeModels/one.glb'
        console.log('正在加载模型：', modelPath) // 添加日志
        const gltf = await new Promise((resolve, reject) => {
            loader.load(
                modelPath,
                (gltf) => {
                    console.log(`${modelName} 模型加载成功：`, gltf)
                    console.log('模型场景结构：', gltf.scene)
                    console.log('模型动画：', gltf.animations)
                    resolve(gltf)
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded')
                },
                (err) => {
                    console.error('模型加载错误：', err)
                    reject(err)
                }
            )
        })

        // 清除场景中的其他物体
        while(scene.children.length > 0){ 
            scene.remove(scene.children[0])
        }

        // 检查模型是否为空
        if (!gltf.scene || !gltf.scene.children || gltf.scene.children.length === 0) {
            throw new Error('加载的模型是空的')
        }

        // 添加模型到场景
        scene.add(gltf.scene)
        console.log('场景中的对象数量：', scene.children.length)

        // 自动调整相机位置以适应模型
        const box = new THREE.Box3().setFromObject(gltf.scene)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())
        console.log('模型尺寸：', size)
        console.log('模型中心点：', center)

        const maxDim = Math.max(size.x, size.y, size.z)
        const fov = camera.fov * (Math.PI / 180)
        let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2))
        cameraZ *= 1.5 // 稍微拉远一点

        // 调整相机位置
        camera.position.set(center.x, center.y, center.z + cameraZ)
        camera.lookAt(center)
        controls.target.copy(center)
        console.log('相机位置：', camera.position)
        console.log('相机朝向：', controls.target)

        // 重新添加光源
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
        scene.add(ambientLight)
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5)
        directionalLight.position.set(5, 5, 5)
        directionalLight.castShadow = true
        scene.add(directionalLight)

        // 添加辅助光源
        const pointLight = new THREE.PointLight(0xffffff, 1)
        pointLight.position.set(-5, 5, -5)
        scene.add(pointLight)

        // 添加坐标轴辅助
        const axesHelper = new THREE.AxesHelper(5)
        scene.add(axesHelper)

        // 设置渲染器的色调映射
        renderer.outputEncoding = THREE.sRGBEncoding
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 1.0

        // 设置动画循环
        function animate() {
            requestAnimationFrame(animate)
            controls.update()
            renderer.render(scene, camera)
        }
        animate()

        loading.value = false
    } catch (err) {
        console.error('Error loading model:', err)
        error.value = '模型加载失败：' + err.message
        loading.value = false
    }
}
</script>

<style scoped lang='less'>
.threeBox {
    height: calc(100% - 30px);
}

.buttonGroup {
    padding: 10px;
}
</style>
