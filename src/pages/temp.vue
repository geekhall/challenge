<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import Matter from 'matter-js'

const { Engine, Render, World, Bodies, Runner } = Matter
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
  const ground = Bodies.rectangle(400, 200, 410, 50, {
    isStatic: true,
    render: wireframe,
  })

  // add all of the bodies to the world
  World.add(engine.world, [boxA, boxB, ground])

  f.add = () => {
    const boxA = Bodies.rectangle(180, -40, 80, 80, { render: wirebox })
    World.add(engine.world, [boxA])
  }
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
<canvas ref="el" width="600" height="600"></canvas>
note
p hands-on <a href="https://brm.io/matter-js" target="_blank">Matter.js</a>
</template>
