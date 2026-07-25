# 라이프사이클 상세 다이어그램(순환 링 뷰) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 사이트 매니페스토·랜딩 6곳의 P1~P6 mermaid를, 주체(인간/AI)와 하네스(관문+가드레일)를 담은 `LifecycleDiagram` Vue 컴포넌트로 교체한다.

**Architecture:** VitePress 기본 테마를 확장해 전역 컴포넌트 1벌 등록. 텍스트는 로케일 데이터 파일에서 `useData().lang`으로 선택. 데스크톱(≥960px)은 SVG 호 + absolute 카드의 순환 링, 모바일은 세로 카드 스택(두 컨테이너를 렌더하고 CSS 미디어 쿼리로 전환).

**Tech Stack:** VitePress(기존), Vue 3 SFC, 인라인 SVG. 신규 의존성 없음.

## Global Constraints

- 스펙: `specs/2026-07-25-lifecycle-diagram-prd.md` — 카드 문구는 PRD 3.2 표가 단일 원천, 임의 변경 금지
- 색상 의미 고정: 인간 주도=호박, AI 주도=파랑, 가드레일=녹색, 불합격=빨강, 자산 갱신=보라. 다크/라이트는 `html.dark` 변수 오버라이드
- 관문 2배지 고정 문구: "◆ 계획 승인"(2→3), "◆ 최종 리뷰 → ◆ 배포 승인"(4→5) — en "Plan approval" / "Final review → Ship approval", ja 「計画承認」/「最終レビュー → デプロイ承認」
- No-Gos: 애니메이션·인터랙션 금지, 역할 세분 금지, vdlc.md·슬라이드 수정 금지
- 검증 수단: `npm run docs:build` + 헤드리스 Chrome 스크린샷(레포에 테스트 프레임워크 없음)
- 커밋은 main 직행(레포 관례), 각 Task 말미에 커밋

---

### Task 1: 테마 스캐폴드와 로케일 데이터

**Files:**
- Create: `docs/.vitepress/theme/index.ts`
- Create: `docs/.vitepress/theme/lifecycle-data.ts`
- Create: `docs/.vitepress/theme/LifecycleDiagram.vue` (이 Task에서는 플레이스홀더 아님 — 최소 렌더 골격)

**Interfaces:**
- Produces: 전역 컴포넌트 `<LifecycleDiagram />`; `lifecycleStrings: Record<string, LifecycleStrings>` (키 `en-US`/`ko-KR`/`ja-JP`); 타입 `LifecycleStrings { legend, hub, gates, edges, badges, stages[6] }`, `StageStrings { name, lead: 'human'|'ai', human, ai, guard }`

- [ ] **Step 1: `docs/.vitepress/theme/index.ts` 작성**

```ts
import DefaultTheme from "vitepress/theme";
import LifecycleDiagram from "./LifecycleDiagram.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("LifecycleDiagram", LifecycleDiagram);
  },
};
```

- [ ] **Step 2: `lifecycle-data.ts` 작성 — PRD 3.2 표 전문을 3개 로케일로**

```ts
export interface StageStrings {
  name: string;
  lead: "human" | "ai";
  human: string;
  ai: string;
  guard: string;
}

export interface LifecycleStrings {
  legend: { human: string; ai: string; gate: string; guard: string; fail: string; feedback: string };
  hub: { line1: string; line2: string };
  gates: { plan: string; review: string };
  edges: { fail: string; feedback: string };
  badges: { human: string; ai: string };
  stages: [StageStrings, StageStrings, StageStrings, StageStrings, StageStrings, StageStrings];
}

export const lifecycleStrings: Record<string, LifecycleStrings> = {
  "ko-KR": {
    legend: { human: "인간 주도", ai: "AI 주도", gate: "◆ 인간 관문", guard: "🛡 자동 가드레일", fail: "불합격 반송", feedback: "자산 갱신" },
    hub: { line1: "의도가 1차 산출물", line2: "코드는 재생성 가능한 2차 산출물" },
    gates: { plan: "◆ 계획 승인", review: "◆ 최종 리뷰 → ◆ 배포 승인" },
    edges: { fail: "불합격 반송", feedback: "컨텍스트 자산 갱신" },
    badges: { human: "인간 주도", ai: "AI 주도" },
    stages: [
      { name: "1. 의도 정의", lead: "human", human: "문제 합의 · PR-FAQ/6-pager · 성공 기준 명시", ai: "리서치 · 초안 · 모호성 지적", guard: "의도 문서 템플릿 · 검증 가능한 성공 기준" },
      { name: "2. 컨텍스트 설계", lead: "human", human: "규칙·컨벤션 정비 · ADR·용어집 갱신", ai: "낡은 자산 탐지 · 골격 초안", guard: "CLAUDE.md · ADR · No-Gos" },
      { name: "3. 공동 구현", lead: "ai", human: "계획 요약 되묻기 · 방향 통제", ai: "계획 제안 → 구현 · 자가 점검 · 병렬 오케스트레이션", guard: "검증 가능한 작업 단위 · CLAUDE.md 규칙" },
      { name: "4. 검증", lead: "ai", human: "최종 리뷰 · \"설명할 수 있는가\" 이해 검증", ai: "자동 테스트 · 정적 분석 · 교차 리뷰", guard: "리스크 비례 검증 강도 · 1회 통과율 측정" },
      { name: "5. 배포와 관찰", lead: "ai", human: "배포 승인", ai: "자동 배포 · 운영 관찰 · 이슈의 재현 컨텍스트화", guard: "CI/CD · 관측(로그·에러율·지연) · 롤백" },
      { name: "6. 환류", lead: "human", human: "배운 것 → 규칙·체크리스트 · 이해 부채 상환(학습)", ai: "반복 패턴 추출 · 위키 정리", guard: "체크리스트 갱신 · 자산 증가량 측정" },
    ],
  },
  "en-US": {
    legend: { human: "Human-led", ai: "AI-led", gate: "◆ Human gate", guard: "🛡 Automated guardrails", fail: "Fail return", feedback: "Asset update" },
    hub: { line1: "Intent is the primary artifact", line2: "code is a regenerable secondary artifact" },
    gates: { plan: "◆ Plan approval", review: "◆ Final review → ◆ Ship approval" },
    edges: { fail: "Fail — return to build", feedback: "Context-asset update" },
    badges: { human: "Human-led", ai: "AI-led" },
    stages: [
      { name: "1. Intent", lead: "human", human: "Agree on the problem · PR-FAQ / 6-pager · explicit success criteria", ai: "Research · drafts · flagging ambiguity", guard: "Intent-doc template · verifiable success criteria" },
      { name: "2. Context", lead: "human", human: "Curate rules & conventions · update ADRs & glossary", ai: "Detect stale assets · skeleton drafts", guard: "CLAUDE.md · ADRs · No-Gos" },
      { name: "3. Co-Construction", lead: "ai", human: "Restate the plan in your own words · steer direction", ai: "Propose plan → implement · self-check · parallel orchestration", guard: "Verifiable units of work · CLAUDE.md rules" },
      { name: "4. Verification", lead: "ai", human: "Final review · \"can you explain it\" understanding check", ai: "Automated tests · static analysis · cross-review", guard: "Risk-proportional rigor · first-pass rate tracking" },
      { name: "5. Ship & Observe", lead: "ai", human: "Ship approval", ai: "Auto deploy · observe operations · turn issues into reproducible context", guard: "CI/CD · observability (logs, error rate, latency) · rollback" },
      { name: "6. Evolve", lead: "human", human: "Learnings → rules & checklists · repay understanding debt", ai: "Extract repeated patterns · organize the wiki", guard: "Checklist updates · asset-growth measurement" },
    ],
  },
  "ja-JP": {
    legend: { human: "人間主導", ai: "AI主導", gate: "◆ 人間の関門", guard: "🛡 自動ガードレール", fail: "不合格差し戻し", feedback: "資産更新" },
    hub: { line1: "意図が一次成果物", line2: "コードは再生成可能な二次成果物" },
    gates: { plan: "◆ 計画承認", review: "◆ 最終レビュー → ◆ デプロイ承認" },
    edges: { fail: "不合格 — ビルドへ差し戻し", feedback: "コンテキスト資産の更新" },
    badges: { human: "人間主導", ai: "AI主導" },
    stages: [
      { name: "1. 意図定義", lead: "human", human: "問題の合意 · PR-FAQ / 6-pager · 成功基準の明示", ai: "リサーチ · 草案 · 曖昧さの指摘", guard: "意図文書テンプレート · 検証可能な成功基準" },
      { name: "2. コンテキスト設計", lead: "human", human: "規則・コンベンションの整備 · ADR・用語集の更新", ai: "古い資産の検出 · 骨格の草案", guard: "CLAUDE.md · ADR · No-Gos" },
      { name: "3. 共同構築", lead: "ai", human: "計画を自分の言葉で要約し確認 · 方向の統制", ai: "計画提案 → 実装 · 自己点検 · 並列オーケストレーション", guard: "検証可能な作業単位 · CLAUDE.mdの規則" },
      { name: "4. 検証", lead: "ai", human: "最終レビュー · 「説明できるか」の理解検証", ai: "自動テスト · 静的解析 · 相互レビュー", guard: "リスク比例の検証強度 · 一発通過率の測定" },
      { name: "5. デプロイと観察", lead: "ai", human: "デプロイ承認", ai: "自動デプロイ · 運用観察 · 課題の再現コンテキスト化", guard: "CI/CD · 可観測性(ログ・エラー率・遅延) · ロールバック" },
      { name: "6. 還流", lead: "human", human: "学び → 規則・チェックリスト · 理解負債の返済", ai: "反復パターンの抽出 · Wikiの整理", guard: "チェックリスト更新 · 資産増加量の測定" },
    ],
  },
};
```

- [ ] **Step 3: `LifecycleDiagram.vue` 최소 골격 작성** (링은 Task 2에서 — 여기서는 로케일 선택과 범례만 렌더해 배선 검증)

```vue
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
```

- [ ] **Step 4: 임시 확인 — `docs/ko/manifesto.md`의 4장 mermaid 블록 "위"에 `<LifecycleDiagram />` 한 줄을 추가**(mermaid는 아직 삭제하지 않음)

- [ ] **Step 5: 빌드 검증**

Run: `npm run docs:build 2>&1 | grep -E 'error|build complete'`
Expected: `build complete in …` (error 없음)

- [ ] **Step 6: 커밋**

```bash
git add docs/.vitepress/theme docs/ko/manifesto.md
git commit -m "feat: LifecycleDiagram 테마 스캐폴드와 로케일 데이터"
```

---

### Task 2: 데스크톱 링 레이아웃

**Files:**
- Modify: `docs/.vitepress/theme/LifecycleDiagram.vue` (Task 1 골격 확장)

**Interfaces:**
- Consumes: Task 1의 `t`(LifecycleStrings), CSS 변수 `--lc-*`
- Produces: `.lc-ring`(데스크톱 전용 컨테이너, 1080×830 고정 캔버스 + `overflow-x:auto` 래퍼)

- [ ] **Step 1: 링 뷰 템플릿·좌표 추가** — `<template>`의 `.lc-legend` 아래에 다음을 추가하고, `<script setup>`에 좌표 상수를 추가

```ts
// script setup에 추가
const POS = [
  { left: 425, top: 34 },  { left: 685, top: 190 }, { left: 685, top: 490 },
  { left: 425, top: 640 }, { left: 165, top: 490 }, { left: 165, top: 190 },
];
```

```html
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
    <div class="lc-gate" style="left:330px;top:700px">{{ t.gates.review }}</div>
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
```

- [ ] **Step 2: 링 뷰 스타일 추가** — `<style scoped>`에 추가

```css
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
```

- [ ] **Step 3: 빌드 + 스크린샷 검증 (라이트·다크)**

```bash
npm run docs:build 2>&1 | grep -E 'error|build complete'
npm run docs:preview -- --port 4863 >/dev/null 2>&1 &
sleep 2
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless=new --disable-gpu --window-size=1400,1800 --virtual-time-budget=8000 \
  --screenshot=$SCRATCH/lc-desktop-dark.png "http://localhost:4863/ko/manifesto"
```

Expected: 스크린샷에서 링 6카드·관문 2배지·점선 2개가 겹침/잘림 없이 보임. (라이트 모드는 스크린샷 후 Read로 눈검증 — VitePress 기본이 시스템 테마이므로 `--force-dark-mode` 유무로 두 번 촬영)

- [ ] **Step 4: 커밋**

```bash
git add docs/.vitepress/theme/LifecycleDiagram.vue
git commit -m "feat: 링 레이아웃 — 6카드·관문·피드백 점선·중앙 허브"
```

---

### Task 3: 모바일 세로 스택

**Files:**
- Modify: `docs/.vitepress/theme/LifecycleDiagram.vue`

**Interfaces:**
- Consumes: Task 1 데이터·Task 2 카드 마크업 구조(카드 부분을 서브컴포넌트로 빼지 않고 v-for 재사용)
- Produces: `.lc-stack`(모바일 전용) — 960px 미만에서 링 숨김·스택 표시

- [ ] **Step 1: 스택 템플릿 추가** — `.lc-ring-wrap` 뒤에 추가. 카드 사이 삽입물: 2→3 앞 관문, 4 뒤 불합격 배지, 4→5 사이 관문, 6 뒤 자산 갱신 배지

```html
<div class="lc-stack">
  <template v-for="(s, i) in t.stages" :key="'m-' + s.name">
    <div v-if="i === 2" class="lc-gate lc-gate-inline">{{ t.gates.plan }}</div>
    <div v-if="i === 4" class="lc-gate lc-gate-inline">{{ t.gates.review }}</div>
    <div class="lc-card lc-card-static" :class="s.lead === 'human' ? 'lead-human' : 'lead-ai'">
      <!-- Task 2의 카드 내부 마크업과 동일 (head / rows / guard-row) -->
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
```

- [ ] **Step 2: 미디어 쿼리 스타일 추가**

```css
.lc-stack { display: none; }
@media (max-width: 959px) {
  .lc-ring-wrap { display: none; }
  .lc-stack { display: flex; flex-direction: column; align-items: stretch; gap: 6px; background: var(--vp-c-bg-soft); border-radius: 8px; padding: 12px; }
  .lc-card-static { position: static; width: auto; }
  .lc-gate-inline { position: static; text-align: center; align-self: center; }
  .lc-edge-inline { font-size: 10px; text-align: center; }
  .lc-down { text-align: center; color: var(--vp-c-text-3); line-height: 1; }
}
```

- [ ] **Step 3: 모바일 스크린샷 검증**

```bash
"$CHROME" --headless=new --disable-gpu --window-size=390,3000 --virtual-time-budget=8000 \
  --screenshot=$SCRATCH/lc-mobile.png "http://localhost:4863/ko/manifesto"
```

Expected: 세로 스택 1→6, 관문 배지가 3·5번째 카드 앞에, 링은 미표시.

- [ ] **Step 4: 커밋**

```bash
git add docs/.vitepress/theme/LifecycleDiagram.vue
git commit -m "feat: 모바일 세로 스택 리플로우"
```

---

### Task 4: 6곳 교체와 규칙 갱신

**Files:**
- Modify: `docs/ko/manifesto.md`, `docs/manifesto.md`, `docs/ja/manifesto.md` — 4장의 ```mermaid 블록(P1~P6)을 `<LifecycleDiagram />`으로 교체 (ko는 Task 1에서 추가한 중복 줄 정리)
- Modify: `docs/ko/index.md`, `docs/index.md`, `docs/ja/index.md` — 랜딩의 ```mermaid 블록 동일 교체
- Modify: `CLAUDE.md` — "mermaid 다이어그램(라이프사이클 6단계)은 사이트 랜딩·매니페스토·슬라이드에 같은 구조로 존재" 규칙을 "사이트는 `LifecycleDiagram.vue`(로케일 데이터 `lifecycle-data.ts`) 사용, mermaid P1~P6은 vdlc.md·슬라이드에만 잔존"으로 갱신

**Interfaces:**
- Consumes: 전역 컴포넌트 `<LifecycleDiagram />` (Task 1 등록)

- [ ] **Step 1: 6개 파일에서 mermaid 블록 → `<LifecycleDiagram />` 교체** (블록 전체 삭제 후 한 줄 삽입; 전후 본문 문단은 유지)

- [ ] **Step 2: 잔존 확인**

Run: `grep -rn "P1\[" docs/ --include='*.md' | grep -v .vitepress`
Expected: 출력 없음 (vdlc.md·slides는 docs/ 밖이므로 잔존 정상)

- [ ] **Step 3: CLAUDE.md 규칙 문구 갱신** (위 Files 항목의 문구로)

- [ ] **Step 4: 빌드 + en/ja 스팟 스크린샷**

```bash
npm run docs:build 2>&1 | grep -E 'error|build complete'
"$CHROME" --headless=new --disable-gpu --window-size=1400,1800 --virtual-time-budget=8000 \
  --screenshot=$SCRATCH/lc-en.png "http://localhost:4863/manifesto"
"$CHROME" --headless=new --disable-gpu --window-size=1400,1800 --virtual-time-budget=8000 \
  --screenshot=$SCRATCH/lc-ja-landing.png "http://localhost:4863/ja/"
```

Expected: en 매니페스토·ja 랜딩에서 각 로케일 문자열로 렌더.

- [ ] **Step 5: 커밋**

```bash
git add docs/ CLAUDE.md
git commit -m "feat: 매니페스토·랜딩 6곳 P1~P6 mermaid를 LifecycleDiagram으로 교체"
```

---

### Task 5: 최종 검증·릴리즈

**Files:**
- Modify: `docs/{,ko/,ja/}releases.md` — v1.2 항목 신설("라이프사이클 상세 다이어그램 — 주체·하네스 순환 뷰")
- Modify: `docs/.vitepress/config.ts` — `VERSION = "v1.2"`
- Modify: `slides/slides.md` — 표지 버전 v1.2

**Interfaces:**
- Consumes: PRD 5장 성공 기준 체크리스트

- [ ] **Step 1: PRD 성공 기준 전 항목 실행·확인** — 빌드, 데스크톱/모바일 × 다크/라이트 스크린샷 4장 Read로 눈검증, PRD 3.2 표 vs 렌더 문구 대조, `grep -rn '```mermaid' docs/{,ko/,ja/}manifesto.md docs/{,ko/,ja/}index.md` 출력 없음 확인

- [ ] **Step 2: 릴리즈 노트 v1.2(3벌)·VERSION·슬라이드 표지 갱신** (CLAUDE.md 버전 갱신 규칙 준수)

- [ ] **Step 3: 슬라이드 빌드 확인**

Run: `cd slides && npm run build 2>&1 | tail -1`
Expected: `✓ built in …`

- [ ] **Step 4: 커밋·푸시**

```bash
git add -A
git commit -m "docs: v1.2 — 라이프사이클 상세 다이어그램 릴리즈"
git push origin main
```
