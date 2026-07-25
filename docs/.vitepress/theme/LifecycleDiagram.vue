<script setup lang="ts">
import { computed } from "vue";
import { useData } from "vitepress";
import { lifecycleStrings } from "./lifecycle-data";

const { lang } = useData();
const t = computed(() => lifecycleStrings[lang.value] ?? lifecycleStrings["en-US"]);
</script>

<template>
  <div class="vdlc-lc">
    <div class="lc-legend">
      <span><i class="sw sw-human" /> {{ t.legend.human }}</span>
      <span><i class="sw sw-ai" /> {{ t.legend.ai }}</span>
      <span class="c-gate">{{ t.legend.gate }}</span>
      <span class="c-guard">{{ t.legend.guard }}</span>
    </div>
  </div>
</template>

<style scoped>
.vdlc-lc {
  --lc-human: #b07d1e;
  --lc-ai: #2e78c9;
  --lc-guard: #3e8e3e;
  --lc-fail: #c0392b;
  --lc-feedback: #7d5bbe;
}
:global(html.dark) .vdlc-lc {
  --lc-human: #e8b34b;
  --lc-ai: #5fb3f5;
  --lc-guard: #6bc46b;
  --lc-fail: #e05555;
  --lc-feedback: #9b7fd4;
}
.lc-legend { display: flex; flex-wrap: wrap; gap: 14px; font-size: 12px; color: var(--vp-c-text-2); margin-bottom: 8px; }
.sw { display: inline-block; width: 10px; height: 10px; border-radius: 2px; }
.sw-human { background: var(--lc-human); }
.sw-ai { background: var(--lc-ai); }
.c-gate { color: var(--lc-human); }
.c-guard { color: var(--lc-guard); }
</style>
