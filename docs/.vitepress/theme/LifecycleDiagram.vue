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
      <span class="c-fail">- - {{ t.legend.fail }}</span>
      <span class="c-fb">- - {{ t.legend.feedback }}</span>
    </div>

    <div class="lc-stack">
      <template v-for="(s, i) in t.stages" :key="s.name">
        <div v-if="i === 2" class="lc-gate">{{ t.gates.plan }}</div>
        <div v-if="i === 4" class="lc-gate">{{ t.gates.review }}</div>
        <div class="lc-card" :class="s.lead === 'human' ? 'lead-human' : 'lead-ai'">
          <div class="lc-card-head">
            <span class="lc-card-name">{{ s.name }}</span>
            <span class="lc-badge">{{ s.lead === 'human' ? t.badges.human : t.badges.ai }}</span>
          </div>
          <template v-if="s.lead === 'ai'">
            <div class="lc-row lc-ai-row">🤖 {{ s.ai }}</div>
            <div class="lc-row lc-human-row">👤 {{ s.human }}</div>
          </template>
          <template v-else>
            <div class="lc-row lc-human-row">👤 {{ s.human }}</div>
            <div class="lc-row lc-ai-row">🤖 {{ s.ai }}</div>
          </template>
          <div class="lc-guard-row">🛡 {{ s.guard }}</div>
        </div>
        <div v-if="i === 3" class="lc-edge-inline lc-fail-c">↩ {{ t.edges.fail }}</div>
        <div v-if="i === 5" class="lc-edge-inline lc-fb-c">⟲ {{ t.edges.feedback }}</div>
        <div v-if="i < 5" class="lc-down">↓</div>
      </template>

      <div class="lc-hub">{{ t.hub.line1 }} · {{ t.hub.line2 }}</div>
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
.lc-legend { display: flex; flex-wrap: wrap; gap: 14px; font-size: 13px; color: var(--vp-c-text-2); margin-bottom: 8px; max-width: 820px; margin-left: auto; margin-right: auto; }
.sw { display: inline-block; width: 10px; height: 10px; border-radius: 2px; }
.sw-human { background: var(--lc-human); }
.sw-ai { background: var(--lc-ai); }
.c-gate { color: var(--lc-human); }
.c-guard { color: var(--lc-guard); }
.c-fail { color: var(--lc-fail); }
.c-fb { color: var(--lc-feedback); }

.lc-stack { display: flex; flex-direction: column; align-items: stretch; gap: 8px; background: var(--vp-c-bg-soft); border-radius: 8px; padding: 18px; max-width: 820px; margin: 0 auto; }
.lc-card { background: var(--vp-c-bg); border-radius: 8px; padding: 12px 16px; border: 1.5px solid; }
.lead-human { border-color: var(--lc-human); }
.lead-ai { border-color: var(--lc-ai); }
.lc-card-head { display: flex; justify-content: space-between; align-items: center; gap: 6px; margin-bottom: 4px; }
.lc-card-name { font-size: 16px; font-weight: 700; color: var(--vp-c-text-1); }
.lc-badge { font-size: 12px; border-radius: 4px; padding: 2px 8px; white-space: nowrap; }
.lead-human .lc-badge { background: color-mix(in srgb, var(--lc-human) 18%, transparent); color: var(--lc-human); }
.lead-ai .lc-badge { background: color-mix(in srgb, var(--lc-ai) 18%, transparent); color: var(--lc-ai); }
.lc-row { font-size: 14px; line-height: 1.6; }
.lc-human-row { color: var(--vp-c-text-1); }
.lc-ai-row { color: color-mix(in srgb, var(--lc-ai) 60%, var(--vp-c-text-1)); }
.lc-guard-row { font-size: 13px; color: var(--lc-guard); border-top: 1px solid var(--vp-c-divider); margin-top: 6px; padding-top: 5px; }
.lc-gate { align-self: center; background: var(--vp-c-bg); border: 1.5px solid var(--lc-human); border-radius: 6px; padding: 5px 12px; font-size: 13.5px; font-weight: 700; color: var(--lc-human); white-space: nowrap; text-align: center; }
.lc-edge-inline { font-size: 13px; text-align: center; }
.lc-fail-c { color: var(--lc-fail); }
.lc-fb-c { color: var(--lc-feedback); }
.lc-down { text-align: center; color: var(--vp-c-text-3); line-height: 1; }
.lc-hub { margin-top: 8px; text-align: center; font-size: 13px; color: var(--vp-c-text-3); border-top: 1px dashed var(--vp-c-divider); padding-top: 10px; }
</style>
