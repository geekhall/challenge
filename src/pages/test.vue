<script setup lang="ts">

const el = $ref<HTMLCanvasElement>()
const ctx = $computed(() => el!.getContext('2d')!)
// const pendingTasks: Function[] = []

function init() {
  // Non-rotated rectangle
  ctx.fillStyle = 'gray'
  ctx.fillRect(80, 60, 140, 30)

  // Matrix transformation
  // moves the matrix's origin to the shape's center
  ctx.translate(150, 75)
  // rotate the matrix closewise
  // Math.PI / 6 = 30°
  // Math.PI / 3 = 60°
  // Math.PI / 2 = 90°
  // ... etc
  ctx.rotate(Math.PI / 6)
  ctx.translate(-150, -75)

  // // Rotated rectangle
  ctx.fillStyle = 'red'
  ctx.fillRect(80, 60, 140, 30)

  ctx.setTransform(1, 0, 0, 1, 0, 0)
  // Point of transform origin
  ctx.arc(0, 0, 5, 0, 2 * Math.PI)
  ctx.fillStyle = 'blue'
  ctx.fill()

  // Non-rotated rectangle
  ctx.fillStyle = 'gray'
  ctx.fillRect(100, 0, 80, 20)

  // Rotated rectangle
  ctx.rotate(45 * Math.PI / 180)
  ctx.fillStyle = 'red'
  ctx.fillRect(100, 0, 80, 20)

  // Reset transformation matrix to the identity matrix
  ctx.setTransform(1, 0, 0, 1, 0, 0)
}

onMounted(() => {
  init()
})
</script>

<template>
  <div>
    <div>
      <h1>Temp test page.</h1>
    </div>
  </div>
  <div flex="~" justify-center>
    <canvas ref="el" width="600" height="600" border />
  </div>
</template>
