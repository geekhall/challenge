<script setup lang="ts">
// const props = defineProps<{
//   modelValue?: boolean
// }>()
const el = $ref<HTMLCanvasElement>()
const ctx = $computed(() => el!.getContext('2d')!)
const WIDTH = 600
const HEIGHT = 600

interface Point{
  x: number
  y: number
}
interface Branch {
  start: Point
  length: number
  angle: number
}

const startPoint = { x: WIDTH / 2, y: HEIGHT }

function init() {
  ctx.strokeStyle = '#fff'
  step({
    start: startPoint,
    length: 5,
    angle: -Math.PI / 2,
  })
}

const pendingTasks: Function[] = []

function step(branch: Branch, depth = 0) {
  const end = getEndpoint(branch)
  drawBranch(branch)
  if (depth < 4 || Math.random() < 0.5) {
    pendingTasks.push(() => step({
      start: end,
      length: branch.length + (Math.random() * branch.length - branch.length / 2),
      angle: branch.angle - 0.3 * Math.random(),
    }, depth + 1))
  }
  if (depth < 4 || Math.random() < 0.5) {
    pendingTasks.push(() => step({
      start: end,
      length: branch.length + (Math.random() * 10 - 5),
      angle: branch.angle + 0.3 * Math.random(),
    }, depth + 1))
  }
}

function frame(frameCount: number) {
  const tasks = [...pendingTasks]
  pendingTasks.length = 0
  tasks.forEach(fn => fn())
}

let framesCount = 0
function startFrame() {
  requestAnimationFrame(() => {
    framesCount += 1
    if (framesCount % 2 === 0)
      frame(framesCount)
    if (framesCount >= 1000)
      return
    startFrame()
  })
}

startFrame()

function lineTo(p1: Point, p2: Point) {
  ctx.beginPath()
  ctx.moveTo(p1.x, p1.y)
  ctx.lineTo(p2.x, p2.y)
  ctx.stroke()
}

function getEndpoint(b: Branch): Point {
  return {
    x: b.start.x + b.length * Math.cos(b.angle),
    y: b.start.y + b.length * Math.sin(b.angle),
  }
}
function drawBranch(l: Branch) {
  const { start, length, angle } = l
  const end = {
    x: start.x + length * Math.cos(angle),
    y: start.y + length * Math.sin(angle),
  }
  lineTo(start, end)
}

onMounted(() => {
  init()
})
</script>

<template>
  <div>
    <div>
      <h1>Plum Blossom.</h1>
    </div>
  </div>
  <div flex="~" justify-center>
    <canvas ref="el" width="600" height="600" border />
  </div>
</template>
