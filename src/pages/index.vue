<script setup lang="ts">
const name = $ref('')

const router = useRouter()
const go = () => {
  if (name)
    router.push(`/hi/${encodeURIComponent(name)}`)
}
</script>

<template>
  <div>
    <div i-carbon-fire text-4xl inline-block />
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse-lite" target="_blank">
        Frontend challenge!
      </a>
    </p>
    <a href="./001">001 - droping box</a>
    <br>
    <a href="./002">002 - minesweeper</a>
    <br>
    <a href="./003">003 - 3D world</a>
    <br>
    <a href="./004">004 - plum blossom</a>
    <br>
    <a href="./test">100 - temp test page</a>
    <div py-4 />

    <input
      id="input"
      v-model="name"
      placeholder="What's your name?"
      type="text"
      autocomplete="false"
      p="x-4 y-2"
      w="250px"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
      @keydown.enter="go"
    >

    <div>
      <button
        class="m-3 text-sm btn"
        :disabled="!name"
        @click="go"
      >
        Go
      </button>
    </div>
  </div>
</template>
