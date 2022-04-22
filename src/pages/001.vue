<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import Matter from 'matter-js'

const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } = Matter
const f = {
  add: () => {},
}
const canvas = ref(null)

onMounted(async() => {
  // create an engine
  const engine = Engine.create()

  // create a renderer
  const render = Render.create({
    element: canvas.value!,
    engine,
    options: {
      width: 600,
      height: 600,
      background: 'azure',
      wireframes: false,
      // @ts-expect-error untyped
      pixelRatio: 'auto',
    },
  })
  const wirebox = {
    // fillStyle: 'transparent',
    fillStyle: '#69ccc2',
    strokeStyle: 'black',
    lineWidth: 1,
  }
  const wireframe = {
    // fillStyle: 'transparent',
    fillStyle: '#6393d3',
    strokeStyle: 'black',
    lineWidth: 1,
  }
  // create two boxes and a ground
  const boxA = Bodies.rectangle(400, 200, 80, 80, {
    isStatic: false,
    render: wirebox,
  })
  const boxB = Bodies.rectangle(450, 50, 80, 80, {
    isStatic: false,
    render: wirebox,
  })
  // const ground = Bodies.rectangle(400, 610, 810, 60,
  //   {
  //     isStatic: true,
  //     render: wireframe,
  //   },
  // )
  const board = Bodies.rectangle(400, 300, 610, 50, {
    isStatic: true,
    render: wireframe,
  })
  // add mouse control
  const mouse = Mouse.create(render.canvas)
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false,
      },
    },
  })
  render.mouse = mouse
  // add all of the bodies to the world
  World.add(engine.world, [boxA, boxB, board, mouseConstraint])

  f.add = () => {
    const boxA = Bodies.rectangle(400 * Math.random() + 200, 50 * Math.random(), Math.random() * 100, Math.random() * 100, { render: wirebox })
    const ballA = Bodies.circle(400 * Math.random() + 200, 50 * Math.random(), Math.random() * 40)
    const polygonA = Bodies.polygon(400 * Math.random() + 200, 50 * Math.random(), 3, Math.random() * 60)
    const polygonB = Bodies.polygon(400 * Math.random() + 200, 50 * Math.random(), Math.round((Math.random() * 2)) + 5, Math.random() * 60)
    World.add(engine.world, [boxA, ballA, polygonA, polygonB])
  }
  // // fit the render viewport to the scene
  Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 800, y: 600 },
  })
  // run the renderer
  Render.run(render)

  // // create runner
  const runner = Runner.create()

  // // run the engine
  Runner.run(runner, engine)
})

</script>

<template lang="pug">
<div flex="~" justify-center>
paper
.box.centered.overflow-hidden(@click='f.add' ref='canvas')
</div>
note
p hands-on <a href="https://brm.io/matter-js" target="_blank">Matter.js</a>
</template>
