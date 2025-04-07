<template>
    <div style="height: 100%;">
        <div class="buttonGroup">
            <el-button size="mini" @click="loadModel">加载模型</el-button>没加载出来。。。
        </div>
        <div ref="threeBox" class="threeBox">
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
// import {OrbitControls} from 'three/addons/controls/OrbitControls.js'

const scene = new THREE.Scene()
const threeBox = ref()

onMounted(() => {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(threeBox.value.clientWidth, threeBox.value.clientHeight)
    threeBox.value.appendChild(renderer.domElement)

    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00})
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    camera.position.z = 5
    renderer.render(scene, camera)

    // const loader = new GLTFLoader();
    // loader.load('/threeModels/face.glb', function (gltf) {
    //     scene.add(gltf.scene);
    //     renderer.render(scene, camera);
    // }, undefined, function (error) {
    //     console.error(error);
    //
    // });
    function animate() {
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
        cube.rotation.x += 0.01
        cube.rotation.y += 0.01
    }

    animate()
})

const loadModel = () => {
}
</script>

<style scoped lang='less'>
    .threeBox {
        height: calc(100% - 30px);
    }
</style>
