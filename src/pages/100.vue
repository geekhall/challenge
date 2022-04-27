<script setup lang="ts">
const cnt = ref(0)
console.log(cnt)
</script>

<template>
  <div>
    <div>
      <h1>Temp page.</h1>
      {{ cnt }}
    </div>
  </div>
  <div flex="~" justify-center>
    <canvas ref="el" width="600" height="600" border />
  </div>
</template>
