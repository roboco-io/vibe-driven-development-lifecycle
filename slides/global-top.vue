<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const isFullscreen = ref(false)

function sync() {
  isFullscreen.value = !!document.fullscreenElement
}

function toggle() {
  if (document.fullscreenElement)
    document.exitFullscreen()
  else
    document.documentElement.requestFullscreen()
}

onMounted(() => document.addEventListener('fullscreenchange', sync))
onUnmounted(() => document.removeEventListener('fullscreenchange', sync))
</script>

<template>
  <button
    class="fullscreen-toggle"
    :title="isFullscreen ? '전체 화면 종료' : '전체 화면'"
    :aria-label="isFullscreen ? '전체 화면 종료' : '전체 화면'"
    @click="toggle"
  >
    <svg v-if="!isFullscreen" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
    <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 3v3a2 2 0 0 1-2 2H3M21 8h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3M16 21v-3a2 2 0 0 1 2-2h3" />
    </svg>
  </button>
</template>

<style scoped>
.fullscreen-toggle {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border: none;
  border-radius: 0.5rem;
  background: rgba(52, 81, 178, 0.35);
  color: rgba(255, 255, 255, 0.85);
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.2s, background 0.2s;
}
.fullscreen-toggle:hover {
  opacity: 1;
  background: rgba(52, 81, 178, 0.8);
}
</style>
