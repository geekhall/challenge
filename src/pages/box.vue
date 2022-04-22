<script setup lang="ts">
// const props = defineProps<{
//   modelValue?: boolean

// }>()
const WIDTH = 100
const LENGTH = 100
const el = $ref<HTMLCanvasElement>()
const ctx = $computed(() => el!.getContext('2d')!)
// const pendingTasks: Function[] = []

const cordinate_y = Array.from({ length: 600 }, (_, i) => i)
function init() {
  ctx.strokeStyle = '#fff'
  drawBarrier()
  // const intervalId = setInterval(step(250, y), 1000)
  // clearInterval(intervalId)
  // step()..
  cordinate_y.forEach((i) => {
    if (i + LENGTH < 300) {
      setTimeout(() => {
        clearBox(250, i)
        i += 1
        drawBox(250, i)
      }, 40 * Math.sqrt(i))
    }
    else {
      setTimeout(() => {
        drawBoxWithAngle(250, i, -Math.PI / i)
        i += 1
        clearBoxWithAngle(250, i, -Math.PI / i)
      }, 40 * Math.sqrt(i))
    }
  })
}
function clearBoxWithAngle(x: number, y: number, angle: number) {
  ctx.translate(x, y + WIDTH)
  ctx.rotate(angle)
  ctx.translate(-x, -y - WIDTH)
  ctx.clearRect(x, y, LENGTH, WIDTH)
}

function drawBoxWithAngle(x: number, y: number, angle: number) {
  ctx.beginPath()
  ctx.translate(x, y + WIDTH)
  ctx.rotate(angle)
  ctx.translate(-x, -y - WIDTH)
  ctx.fillStyle = '#c3d29c'
  ctx.fillRect(x, y, LENGTH, WIDTH)

  // ctx.stroke()
}

function clearBox(x: number, y: number) {
  ctx.clearRect(x, y, LENGTH, WIDTH)
}
function drawBarrier() {
  ctx.beginPath()
  ctx.rect(300, 300, 300, 20)
  ctx.fillStyle = 'gray'
  ctx.fill()
}

function drawBox(x: number, y: number) {
  ctx.beginPath()
  ctx.rect(x, y, LENGTH, WIDTH)
  ctx.fillStyle = '#c3d29c'
  ctx.fill()
  // ctx.stroke()
}

onMounted(() => {
  init()
})
</script>

<template>
  <div>
    <div>
      <h1>Droping Box.</h1>
    </div>
  </div>
  <div flex="~" justify-center>
    <canvas ref="el" width="600" height="600" border />
  </div>
</template>
