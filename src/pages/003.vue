<script setup lang="ts">
import * as THREE from 'three'
import BlasterScene from '~/composables/BlasterScene'

// const WIDTH = window.innerWidth
// const HEIGHT = window.innerHeight
const WIDTH = 800
const HEIGHT = 600

const el = $ref<HTMLCanvasElement>()
// const ctx = $computed(() => el!.getContext('2d')!)

onMounted(() => {
  const renderer = new THREE.WebGLRenderer({
    canvas: el as HTMLCanvasElement,
  })

  // ctx.strokeStyle = '#fff'
  renderer.setSize(WIDTH, HEIGHT)
  const mainCamera = new THREE.PerspectiveCamera(
    60, // Field of View
    WIDTH / HEIGHT, // Aspect ratio
    0.1, // Near plane
    100) // Far plane
  const scene = new BlasterScene(mainCamera)
  scene.initialize()
  scene.getACube()

  function tick() {
    scene.update()
    renderer.render(scene, mainCamera)
    requestAnimationFrame(tick)
  }
  tick()
})
</script>

<template>
  <div>
    <div>
      <h1>Three.</h1>
    </div>
  </div>
  <div flex="~" justify-center>
    <canvas ref="el" width="600" height="600" border />
  </div>
</template>
