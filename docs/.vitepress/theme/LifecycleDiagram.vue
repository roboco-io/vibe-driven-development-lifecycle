<script setup lang="ts">
import { computed } from "vue";
import { useData } from "vitepress";
import { lifecycleStrings } from "./lifecycle-data";

const { lang } = useData();
const t = computed(() => lifecycleStrings[lang.value] ?? lifecycleStrings["en-US"]);

const POS = [
  { left: 425, top: 34 },  { left: 685, top: 190 }, { left: 685, top: 490 },
  { left: 425, top: 640 }, { left: 165, top: 490 }, { left: 165, top: 190 },
];
</script>

<template>
  <div class="vdlc-lc">
    <div class="lc-legend">
      <span><i class="sw sw-human" /> {{ t.legend.human }}</span>
      <span><i class="sw sw-ai" /> {{ t.legend.ai }}</span>
      <span class="c-gate">{{ t.legend.gate }}</span>
      <span class="c-guard">{{ t.legend.guard }}</span>
    </div>

    <div class="lc-scroll lc-ring-wrap">
      <div class="lc-canvas">
        <svg width="1080" height="830" viewBox="0 0 1080 830" class="lc-svg" aria-hidden="true">
          <defs>
            <marker id="lcArw" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" class="mk-main" /></marker>
            <marker id="lcArwF" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" class="mk-fail" /></marker>
            <marker id="lcArwB" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" class="mk-fb" /></marker>
          </defs>
          <path d="M642.6,128.1 A300,300 0 0 1 732.8,180.2" class="lc-arc" marker-end="url(#lcArw)" />
          <path d="M835.4,357.9 A300,300 0 0 1 835.4,462.1" class="lc-arc" marker-end="url(#lcArw)" />
          <path d="M732.8,639.8 A300,300 0 0 1 642.6,691.9" class="lc-arc" marker-end="url(#lcArw)" />
          <path d="M437.4,691.9 A300,300 0 0 1 347.2,639.8" class="lc-arc" marker-end="url(#lcArw)" />
          <path d="M244.6,462.1 A300,300 0 0 1 244.6,357.9" class="lc-arc" marker-end="url(#lcArw)" />
          <path d="M347.2,180.2 A300,300 0 0 1 437.4,128.1" class="lc-arc" marker-end="url(#lcArw)" />
          <path d="M590,655 Q700,590 750,618" class="lc-dash lc-fail" marker-end="url(#lcArwF)" />
          <path d="M375,295 Q540,370 700,295" class="lc-dash lc-fb" marker-end="url(#lcArwB)" />
        </svg>

        <div class="lc-gate" style="left:856px;top:392px">{{ t.gates.plan }}</div>
        <div class="lc-gate" style="left:330px;top:760px">{{ t.gates.review }}</div>
        <div class="lc-edge-label lc-fail-c" style="left:625px;top:585px">{{ t.edges.fail }}</div>
        <div class="lc-edge-label lc-fb-c" style="left:475px;top:345px">{{ t.edges.feedback }}</div>

        <div class="lc-hub">
          <div class="lc-hub-title">VDLC</div>
          <div class="lc-hub-sub">{{ t.hub.line1 }}<br />{{ t.hub.line2 }}</div>
        </div>

        <div
          v-for="(s, i) in t.stages" :key="s.name"
          class="lc-card" :class="s.lead === 'human' ? 'lead-human' : 'lead-ai'"
          :style="{ left: POS[i].left + 'px', top: POS[i].top + 'px' }"
        >
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
      </div>
    </div>

    <div class="lc-stack">
      <template v-for="(s, i) in t.stages" :key="'m-' + s.name">
        <div v-if="i === 2" class="lc-gate lc-gate-inline">{{ t.gates.plan }}</div>
        <div v-if="i === 4" class="lc-gate lc-gate-inline">{{ t.gates.review }}</div>
        <div class="lc-card lc-card-static" :class="s.lead === 'human' ? 'lead-human' : 'lead-ai'">
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

.lc-scroll { overflow-x: auto; border-radius: 8px; background: var(--vp-c-bg-soft); }
.lc-canvas { position: relative; width: 1080px; height: 830px; margin: 0 auto; }
.lc-svg { position: absolute; inset: 0; }
.lc-arc { stroke: var(--vp-c-text-3); stroke-width: 2.5; fill: none; }
.mk-main { fill: var(--vp-c-text-3); }
.mk-fail { fill: var(--lc-fail); }
.mk-fb { fill: var(--lc-feedback); }
.lc-dash { stroke-width: 2; stroke-dasharray: 6 4; fill: none; }
.lc-fail { stroke: var(--lc-fail); }
.lc-fb { stroke: var(--lc-feedback); }
.lc-gate { position: absolute; background: var(--vp-c-bg); border: 1.5px solid var(--lc-human); border-radius: 6px; padding: 4px 8px; font-size: 11px; font-weight: 700; color: var(--lc-human); white-space: nowrap; }
.lc-edge-label { position: absolute; font-size: 10px; }
.lc-fail-c { color: var(--lc-fail); }
.lc-fb-c { color: var(--lc-feedback); }
.lc-hub { position: absolute; left: 445px; top: 385px; width: 190px; text-align: center; }
.lc-hub-title { font-size: 20px; font-weight: 800; color: var(--vp-c-text-1); }
.lc-hub-sub { font-size: 11px; color: var(--vp-c-text-3); line-height: 1.5; }
.lc-card { position: absolute; width: 230px; background: var(--vp-c-bg); border-radius: 8px; padding: 8px; border: 1.5px solid; }
.lead-human { border-color: var(--lc-human); }
.lead-ai { border-color: var(--lc-ai); }
.lc-card-head { display: flex; justify-content: space-between; align-items: center; gap: 6px; margin-bottom: 4px; }
.lc-card-name { font-size: 12px; font-weight: 700; color: var(--vp-c-text-1); }
.lc-badge { font-size: 9px; border-radius: 3px; padding: 1px 5px; white-space: nowrap; }
.lead-human .lc-badge { background: color-mix(in srgb, var(--lc-human) 18%, transparent); color: var(--lc-human); }
.lead-ai .lc-badge { background: color-mix(in srgb, var(--lc-ai) 18%, transparent); color: var(--lc-ai); }
.lc-row { font-size: 10px; line-height: 1.45; }
.lc-human-row { color: var(--vp-c-text-1); }
.lc-ai-row { color: color-mix(in srgb, var(--lc-ai) 60%, var(--vp-c-text-1)); }
.lc-guard-row { font-size: 9.5px; color: var(--lc-guard); border-top: 1px solid var(--vp-c-divider); margin-top: 4px; padding-top: 3px; }

.lc-stack { display: none; }
@media (max-width: 959px) {
  .lc-ring-wrap { display: none; }
  .lc-stack { display: flex; flex-direction: column; align-items: stretch; gap: 6px; background: var(--vp-c-bg-soft); border-radius: 8px; padding: 12px; }
  .lc-card-static { position: static; width: auto; }
  .lc-gate-inline { position: static; text-align: center; align-self: center; }
  .lc-edge-inline { font-size: 10px; text-align: center; }
  .lc-down { text-align: center; color: var(--vp-c-text-3); line-height: 1; }
}
</style>
