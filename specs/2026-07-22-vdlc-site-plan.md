# VDLC 사이트 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** vdlc.md를 기반으로 매니페스토 + 실무 가이드 이중 구조의 한국어 사이트를 마크다운으로 작성하고, VitePress + GitHub Actions로 vdlc.roboco.io에 배포한다.

**Architecture:** `docs/`가 VitePress 루트이자 마크다운 초안 그 자체. 콘텐츠 초안(Task 1~8) → 사용자 검수 게이트(Task 9) → VitePress 세팅(Task 10) → 배포(Task 11~12) 순서. 콘텐츠가 확정되기 전에는 배포 인프라를 만들지 않는다.

**Tech Stack:** VitePress(최신 1.x), vitepress-plugin-mermaid, GitHub Actions, GitHub Pages(커스텀 도메인 vdlc.roboco.io).

## Global Constraints

- 언어: 한국어. 추후 `en/`, `ja/` 추가를 위해 한국어 콘텐츠는 루트에 배치.
- 도구 서술은 중립, 구체 예시는 Claude Code 기준. 각 가이드 페이지에 "Claude Code로 하면" 섹션(`::: tip Claude Code로 하면` 컨테이너) 1개.
- 사례 페이지는 실제 경험 기반 익명화. 초안에 `<!-- 검수 필요: ... -->` 주석으로 수치·상황 확인 지점을 표시하고 사용자 검수를 받는다.
- 삭제선(취소선) 문법 사용 금지 (사용자 선호).
- 문서 간 링크는 VitePress 관례에 따라 절대 경로(`/guide/intent` 형식) 사용.
- 성숙도 모델 명칭 고정: 탐색(Exploring)–실천(Practicing)–자산화(Compounding)–표준화(Systematizing).
- 측정 지표 4종 고정: 사이클 리드타임, 재작업률, 검증 통과율(1회 통과 비율), 컨텍스트 자산 증가량.
- 커밋 메시지는 conventional commits + `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.
- 원문 vdlc.md는 수정하지 않고 보존한다.

---

### Task 1: 매니페스토 페이지

**Files:**
- Create: `docs/manifesto.md`

**Interfaces:**
- Consumes: `vdlc.md` 전문 (원본 소스)
- Produces: `/manifesto` 경로. 랜딩(Task 8)과 가이드 페이지들이 이 페이지의 앵커(`/manifesto#다섯-가지-원칙` 등)로 링크.

- [ ] **Step 1: vdlc.md를 기반으로 매니페스토 작성**

vdlc.md의 전체 구조(정의–배경–다섯 원칙–여섯 단계 개요–역할–산출물–기존 방법론–안티패턴–맺으며)를 유지하되 다음을 수정:

- frontmatter 추가: `title: VDLC 매니페스토`, `description: 바이브코딩을 전제로 재설계한 소프트웨어 개발 생명주기`
- "4. 라이프사이클: 여섯 단계"의 각 단계 서술 끝에 해당 플레이북 링크 추가 (예: `→ [1단계 플레이북](/guide/intent)`)
- "9. 도입 경로" 섹션은 요약 1문단 + `/adoption/roadmap` 링크로 대체 (상세는 adoption 섹션이 담당, DRY)
- mermaid 다이어그램은 vdlc.md의 것을 그대로 사용

- [ ] **Step 2: 구조 검증**

Run: `grep -c '^## ' docs/manifesto.md`
Expected: 9 내외 (정의, 배경, 원칙, 라이프사이클, 역할, 산출물, 기존 방법론, 안티패턴, 맺으며)

Run: `grep -n '~~' docs/manifesto.md`
Expected: 출력 없음 (삭제선 금지)

- [ ] **Step 3: Commit**

```bash
git add docs/manifesto.md
git commit -m "docs: 매니페스토 페이지 초안"
```

### Task 2: 가이드 — 1·2단계 플레이북 (intent, context)

**Files:**
- Create: `docs/guide/intent.md`
- Create: `docs/guide/context.md`

**Interfaces:**
- Consumes: vdlc.md §4의 1·2단계 서술, 스펙 §3의 플레이북 공통 구조
- Produces: `/guide/intent`, `/guide/context`. 템플릿 페이지(Task 5)의 `/templates/intent-doc`, `/templates/pr-faq`, `/templates/claude-md`로 링크.

- [ ] **Step 1: 플레이북 공통 구조 확정 후 intent.md 작성**

모든 가이드 페이지는 동일한 6개 섹션:

```markdown
---
title: "1단계 — 의도 정의 (Intent)"
---

# 1단계 — 의도 정의 (Intent)

> 한 줄 요약

## 이 단계의 목적
## 실행 순서
## 산출물
## 완료 기준 체크리스트
## 흔한 실수
## Claude Code로 하면
```

intent.md 핵심 내용:
- 실행 순서: ① 문제/기회 한 문단 서술 ② PR-FAQ로 완성 모습 역산 ③ 6-pager 축약형으로 배경·제약·트레이드오프 서술 ④ 검증 가능한 성공 기준 명시 ⑤ 이해관계자 합의
- 산출물: 의도 문서 → `/templates/intent-doc`, PR-FAQ → `/templates/pr-faq` 링크
- 완료 기준: "성공 기준이 검증 가능한 문장인가", "트레이드오프에서 버린 것이 명시됐는가", "에이전트가 행간 추측 없이 읽을 수 있는가" 등 4~6개
- 흔한 실수: 기능 나열식 요구사항, 성공 기준 없는 의도, 한 번 쓰고 버리는 문서
- Claude Code로 하면: 의도 문서를 리포에 커밋하고 세션 시작 시 참조시키는 패턴, plan mode로 의도→계획 변환

- [ ] **Step 2: context.md 작성**

핵심 내용:
- 실행 순서: ① 프로젝트 규칙 파일 골격 작성 ② 아키텍처 결정 기록(ADR) ③ 도메인 용어집 ④ 코딩 컨벤션 ⑤ 재사용 스킬 점검(기존 프로젝트)
- 산출물: CLAUDE.md 예시 → `/templates/claude-md` 링크
- 신규 vs 기존 프로젝트의 차이(최소 골격 vs 자산 점검·갱신) 명시
- 흔한 실수: 규칙 파일에 모든 것을 넣어 컨텍스트 비대화, 문서와 실제 코드의 불일치 방치
- Claude Code로 하면: CLAUDE.md 계층 구조(글로벌/프로젝트), 스킬 디렉토리, 서브에이전트 정의

- [ ] **Step 3: 구조 검증**

Run: `for f in docs/guide/intent.md docs/guide/context.md; do echo "$f: $(grep -c '^## ' $f)"; done`
Expected: 각 6

- [ ] **Step 4: Commit**

```bash
git add docs/guide/intent.md docs/guide/context.md
git commit -m "docs: 가이드 1·2단계 플레이북 초안"
```

### Task 3: 가이드 — 3·4단계 플레이북 (build, verify)

**Files:**
- Create: `docs/guide/build.md`
- Create: `docs/guide/verify.md`

**Interfaces:**
- Consumes: Task 2에서 확정한 6섹션 공통 구조
- Produces: `/guide/build`, `/guide/verify`. verify.md는 `/templates/risk-matrix`, `/templates/review-checklist`로 링크.

- [ ] **Step 1: build.md 작성 (공동 구현)**

핵심 내용:
- 실행 순서: ① 작업을 독립 검증 가능한 단위로 분해 ② 에이전트가 계획 제안 ③ 인간이 계획 승인(관문) ④ 에이전트 구현 ⑤ 단위별 자가 점검
- 계획 승인 관문의 원리: 코드 한 줄 검토 대신 계획 수준 방향 통제
- 병렬 오케스트레이션: 독립 단위별 다중 에이전트, 충돌 방지(worktree 등 격리)
- 흔한 실수: 계획 없이 바로 구현 지시, 거대한 단일 작업 단위, 에이전트 출력을 읽지 않고 승인
- Claude Code로 하면: plan mode 승인 흐름, 서브에이전트 병렬 실행, git worktree 격리

- [ ] **Step 2: verify.md 작성 (검증)**

핵심 내용:
- 3중 방어선: 자동 테스트·정적 분석(1차) → 별도 에이전트 교차 리뷰(2차) → 인간 리뷰(최종)
- 리스크 비례 검증: 결제·인증·개인정보 = 인간 리뷰 강화 / 내부 도구·프로토타입 = 자동 중심 → `/templates/risk-matrix` 링크
- 문제의 근원 추적: 코드 수정으로 끝내지 않고 의도 문서·컨텍스트 결함까지 수정
- 완료 기준: "리스크 등급이 부여됐는가", "1차 방어선이 자동으로 도는가" 등
- Claude Code로 하면: 리뷰 서브에이전트/코드리뷰 커맨드, 훅으로 테스트 강제

- [ ] **Step 3: 구조 검증 + Commit**

Run: `for f in docs/guide/build.md docs/guide/verify.md; do echo "$f: $(grep -c '^## ' $f)"; done`
Expected: 각 6

```bash
git add docs/guide/build.md docs/guide/verify.md
git commit -m "docs: 가이드 3·4단계 플레이북 초안"
```

### Task 4: 가이드 — 5·6단계 플레이북 (ship, evolve)

**Files:**
- Create: `docs/guide/ship.md`
- Create: `docs/guide/evolve.md`

**Interfaces:**
- Consumes: Task 2에서 확정한 6섹션 공통 구조
- Produces: `/guide/ship`, `/guide/evolve`. evolve.md는 `/adoption/metrics`로 링크.

- [ ] **Step 1: ship.md 작성 (배포와 관찰)**

핵심 내용:
- 전제 조건: CI/CD 파이프라인 + 관측 도구 (없으면 VDLC가 작동하지 않음을 명시)
- 실행 순서: ① 검증 통과 산출물 자동 배포 ② 운영 데이터 관찰 ③ 이슈를 재현 가능한 컨텍스트(로그·재현 절차·기대 동작)로 정리 ④ 다음 사이클 입력으로 전달
- 흔한 실수: 이슈를 대화로만 전달(재현 컨텍스트 없음), 배포 승인 관문까지 자동화
- Claude Code로 하면: 이슈→에이전트 투입 파이프라인, 헤드리스 실행(CI 내 claude 실행)

- [ ] **Step 2: evolve.md 작성 (환류)**

핵심 내용:
- 환류 3경로: 반복된 지시→프로젝트 규칙 / 실수 패턴→리뷰 체크리스트 / 도메인 지식→위키
- 사이클 회고를 시간 단위로 가볍게 (스프린트 회고와의 차이)
- "환류 없는 VDLC는 그저 빠른 코딩"임을 강조, 복리 구조 설명
- 완료 기준: "이번 사이클에서 컨텍스트 자산이 하나 이상 갱신됐는가"
- Claude Code로 하면: CLAUDE.md에 규칙 추가하는 습관, 스킬로 승격, 메모리 활용

- [ ] **Step 3: 구조 검증 + Commit**

Run: `for f in docs/guide/ship.md docs/guide/evolve.md; do echo "$f: $(grep -c '^## ' $f)"; done`
Expected: 각 6

```bash
git add docs/guide/ship.md docs/guide/evolve.md
git commit -m "docs: 가이드 5·6단계 플레이북 초안"
```

### Task 5: 템플릿 5종

**Files:**
- Create: `docs/templates/index.md` (모음 소개 + 목록)
- Create: `docs/templates/intent-doc.md`
- Create: `docs/templates/pr-faq.md`
- Create: `docs/templates/risk-matrix.md`
- Create: `docs/templates/review-checklist.md`
- Create: `docs/templates/claude-md.md`

**Interfaces:**
- Consumes: 가이드 페이지들이 링크하는 경로명 (`/templates/intent-doc` 등 — Task 2~4와 일치해야 함)
- Produces: 각 템플릿 페이지. 페이지 구조 = "언제 쓰나" 1문단 + "사용법" + 복사 가능한 코드 블록(마크다운 원문).

- [ ] **Step 1: intent-doc.md, pr-faq.md 작성**

intent-doc: 6-pager 축약형 의도 문서 템플릿. 섹션: 배경 / 문제 / 목표(성공 기준 — 검증 가능한 문장으로) / 비목표(버린 것) / 제약 / 트레이드오프와 근거 / 열린 질문. 각 섹션에 작성 안내 주석 포함.

pr-faq: 보도자료 1페이지(헤드라인–고객 문제–해결–인용) + FAQ(고객 FAQ / 내부 FAQ 각 3~5문항 예시 질문 포함).

- [ ] **Step 2: risk-matrix.md, review-checklist.md 작성**

risk-matrix: 3등급 리스크 분류표(High: 결제·인증·개인정보·비가역 데이터 / Medium: 핵심 비즈니스 로직 / Low: 내부 도구·프로토타입) × 검증 강도 매핑(인간 리뷰 필수 여부, 교차 리뷰, 자동 테스트 수준). 표 + 등급 판정 기준 설명.

review-checklist: 에이전트 산출물 리뷰 체크리스트 — 의도 정합성 / 보안 기본 / 테스트 실재성(테스트가 실제로 검증하는가) / 컨텍스트 반영 여부 / 슬롭 신호(중복, 죽은 코드, 과도한 방어) 항목별 체크박스.

- [ ] **Step 3: claude-md.md, index.md 작성**

claude-md: 실전형 CLAUDE.md 예시 전문 + 각 섹션이 왜 있는지 주석. "도구 중립 원칙의 예외로 Claude Code 구체 예시" 명시. 다른 도구 사용자를 위한 대응물(AGENTS.md 등) 1문단 언급.

index.md: 템플릿 5종 목록 표(이름/언제 쓰나/관련 가이드 단계 링크).

- [ ] **Step 4: 링크 정합성 검증 + Commit**

Run: `grep -rho '/templates/[a-z-]*' docs/guide/ | sort -u`
Expected: 출력된 모든 경로가 `docs/templates/` 실제 파일과 일치

```bash
git add docs/templates/
git commit -m "docs: 템플릿 5종 및 목록 페이지 초안"
```

### Task 6: 사례 2편

**Files:**
- Create: `docs/cases/index.md` (사례 소개 + 익명화 원칙 고지)
- Create: `docs/cases/enterprise.md`
- Create: `docs/cases/startup.md`

**Interfaces:**
- Consumes: 성숙도 모델 레벨 명칭(Global Constraints), 가이드 단계 경로
- Produces: `/cases/enterprise`, `/cases/startup`. 각 사례는 6단계 사이클에 매핑된 내러티브.

- [ ] **Step 1: enterprise.md 작성 (중견기업 레거시 팀 도입기 — 컨설팅 경험 기반 익명화)**

구조: 상황(팀 규모·레거시 스택·도입 전 상태) → 도입 과정(파일럿 선정 → 6단계 사이클 첫 회전 → 저항과 극복) → 결과와 교훈. 성숙도 레벨 이동(L1→L2/L3)을 명시. 구체 수치·상황마다 `<!-- 검수 필요: 실제 경험과 부합하는지 확인 -->` 주석.

- [ ] **Step 2: startup.md 작성 (소규모 팀 신규 서비스 — 로보코 자체 경험 기반 익명화)**

구조: 상황(소규모 팀, 신규 서비스, 그린필드) → VDLC 풀사이클 적용(의도 문서부터 시작한 하루~수일 단위 사이클) → 컨텍스트 자산이 쌓이며 빨라지는 복리 효과 관찰 → 교훈. 동일하게 검수 필요 주석 포함.

- [ ] **Step 3: index.md 작성 + Commit**

index.md: 두 사례 요약 표 + "모든 사례는 실제 경험을 익명화한 것" 고지.

```bash
git add docs/cases/
git commit -m "docs: 도입 사례 2편 초안 (검수 필요 주석 포함)"
```

### Task 7: 도입 섹션 3종 (roadmap, maturity, metrics)

**Files:**
- Create: `docs/adoption/index.md` (섹션 소개)
- Create: `docs/adoption/roadmap.md`
- Create: `docs/adoption/maturity.md`
- Create: `docs/adoption/metrics.md`

**Interfaces:**
- Consumes: 스펙 §4 성숙도 모델 표, vdlc.md §9 도입 경로
- Produces: `/adoption/roadmap`, `/adoption/maturity`, `/adoption/metrics`

- [ ] **Step 1: roadmap.md 작성**

vdlc.md §9의 4걸음(파일럿 → 자산화 → 팀 확산 → 조직 표준)을 각각 소섹션으로 확장: 목표 / 해야 할 일 / 이 걸음의 완료 신호 / 관련 가이드·템플릿 링크. 각 걸음이 성숙도 레벨과 어떻게 대응하는지 명시 (`/adoption/maturity` 링크).

- [ ] **Step 2: maturity.md 작성**

스펙 §4의 4레벨 표 전문 + 레벨별 상세(특징/판별 신호/다음 레벨로 가는 열쇠 1문장). 셀프 진단: 5원칙별 3문항(총 15문항) 체크리스트, "예" 개수 → 레벨 매핑 규칙 포함.

- [ ] **Step 3: metrics.md 작성**

4종 지표 각각: 정의 / 측정 방법(무엇을 어디서 어떻게 셈) / 해석 가이드(좋아지는 신호, 나빠지는 신호) / 주의점(지표 게이밍 방지). 지표: 사이클 리드타임, 재작업률, 검증 통과율(1회 통과 비율), 컨텍스트 자산 증가량.

- [ ] **Step 4: index.md 작성 + 구조 검증 + Commit**

Run: `ls docs/adoption/`
Expected: `index.md maturity.md metrics.md roadmap.md`

```bash
git add docs/adoption/
git commit -m "docs: 도입 로드맵·성숙도 모델·측정 지표 초안"
```

### Task 8: 랜딩 페이지

**Files:**
- Create: `docs/index.md`

**Interfaces:**
- Consumes: 전체 페이지 경로 (링크 대상), VitePress home layout frontmatter 규격
- Produces: `/` 랜딩

- [ ] **Step 1: VitePress home layout으로 작성**

```yaml
---
layout: home
hero:
  name: VDLC
  text: Vibe-Driven Development Lifecycle
  tagline: 의도가 소스다 — 바이브코딩을 전제로 재설계한 소프트웨어 개발 생명주기
  actions:
    - theme: brand
      text: 매니페스토 읽기
      link: /manifesto
    - theme: alt
      text: 실무 가이드
      link: /guide/intent
    - theme: alt
      text: 도입 로드맵
      link: /adoption/roadmap
features:
  - title: 의도가 소스다
    details: 코드가 아니라 자연어 의도가 원본. 코드는 재생성 가능한 2차 산출물이다.
  # ... 5원칙 각 1카드
---
```

frontmatter 아래 본문: 핵심 명제 1문단 + 6단계 mermaid 다이어그램 + "왜 지금인가" 3문제 요약(속도 불균형·품질 리스크·지식 휘발) + 섹션별 진입 링크.

- [ ] **Step 2: 링크 정합성 전체 검증**

Run: `grep -rhoE '\]\(/[a-z/-]+\)' docs/ | sort -u`
Expected: 출력된 모든 내부 링크가 실제 파일에 대응 (guide/context → docs/guide/context.md 등)

- [ ] **Step 3: Commit**

```bash
git add docs/index.md
git commit -m "docs: 랜딩 페이지 초안"
```

### Task 9: 사용자 콘텐츠 검수 게이트

**Files:** 없음 (수정은 피드백에 따라)

- [ ] **Step 1: 검수 요청**

사용자에게 AskUserQuestion으로 검수 요청. 특히 사례 2편의 `<!-- 검수 필요 -->` 지점(수치·상황의 사실성)과 매니페스토 어조를 명시적으로 확인. 페이지별 피드백 수집.

- [ ] **Step 2: 피드백 반영 + Commit**

수정 반영 후:

```bash
git add docs/
git commit -m "docs: 사용자 검수 피드백 반영"
```

검수 통과 전에는 Task 10으로 진행하지 않는다.

### Task 10: VitePress 세팅

**Files:**
- Create: `package.json`
- Create: `docs/.vitepress/config.ts`
- Create: `.gitignore`

**Interfaces:**
- Consumes: 확정된 docs/ 콘텐츠와 경로 구조
- Produces: `npm run docs:build` 성공하는 정적 사이트, 로컬 프리뷰

- [ ] **Step 1: 패키지 초기화**

```bash
npm init -y
npm install -D vitepress vitepress-plugin-mermaid mermaid
```

package.json scripts:

```json
{
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  }
}
```

.gitignore: `node_modules/`, `docs/.vitepress/dist/`, `docs/.vitepress/cache/`

- [ ] **Step 2: config.ts 작성**

```ts
import { withMermaid } from "vitepress-plugin-mermaid";
import { defineConfig } from "vitepress";

export default withMermaid(
  defineConfig({
    lang: "ko-KR",
    title: "VDLC",
    description: "Vibe-Driven Development Lifecycle — 바이브코딩을 전제로 재설계한 소프트웨어 개발 생명주기",
    themeConfig: {
      nav: [
        { text: "매니페스토", link: "/manifesto" },
        { text: "가이드", link: "/guide/intent" },
        { text: "템플릿", link: "/templates/" },
        { text: "사례", link: "/cases/" },
        { text: "도입", link: "/adoption/" },
      ],
      sidebar: {
        "/guide/": [
          {
            text: "6단계 플레이북",
            items: [
              { text: "1. 의도 정의", link: "/guide/intent" },
              { text: "2. 컨텍스트 설계", link: "/guide/context" },
              { text: "3. 공동 구현", link: "/guide/build" },
              { text: "4. 검증", link: "/guide/verify" },
              { text: "5. 배포와 관찰", link: "/guide/ship" },
              { text: "6. 환류", link: "/guide/evolve" },
            ],
          },
        ],
        "/templates/": [
          {
            text: "템플릿",
            items: [
              { text: "모음", link: "/templates/" },
              { text: "의도 문서", link: "/templates/intent-doc" },
              { text: "PR-FAQ", link: "/templates/pr-faq" },
              { text: "리스크 등급표", link: "/templates/risk-matrix" },
              { text: "리뷰 체크리스트", link: "/templates/review-checklist" },
              { text: "CLAUDE.md 예시", link: "/templates/claude-md" },
            ],
          },
        ],
        "/cases/": [
          {
            text: "도입 사례",
            items: [
              { text: "소개", link: "/cases/" },
              { text: "중견기업 레거시 팀", link: "/cases/enterprise" },
              { text: "소규모 팀 신규 서비스", link: "/cases/startup" },
            ],
          },
        ],
        "/adoption/": [
          {
            text: "도입",
            items: [
              { text: "개요", link: "/adoption/" },
              { text: "도입 로드맵", link: "/adoption/roadmap" },
              { text: "성숙도 모델", link: "/adoption/maturity" },
              { text: "측정 지표", link: "/adoption/metrics" },
            ],
          },
        ],
      },
      search: { provider: "local" },
      outline: { label: "이 페이지에서" },
      docFooter: { prev: "이전", next: "다음" },
      socialLinks: [
        { icon: "github", link: "https://github.com/roboco-io/vibe-driven-development-lifecycle" },
      ],
    },
  })
);
```

- [ ] **Step 3: 빌드 검증**

Run: `npm run docs:build`
Expected: 성공, dead link 에러 0건 (VitePress는 깨진 내부 링크를 빌드 실패로 처리)

Run: `npm run docs:preview` 후 사용자에게 로컬 확인 안내 (선택)

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json docs/.vitepress/config.ts .gitignore
git commit -m "feat: VitePress 세팅 (mermaid, 로컬 검색, 사이드바)"
```

### Task 11: GitHub Actions 배포 워크플로

**Files:**
- Create: `.github/workflows/deploy.yml`
- Create: `docs/public/CNAME` (내용: `vdlc.roboco.io`)

**Interfaces:**
- Consumes: Task 10의 빌드 스크립트
- Produces: main 푸시 시 GitHub Pages 자동 배포

- [ ] **Step 1: deploy.yml 작성**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run docs:build
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: CNAME 작성**

```bash
mkdir -p docs/public && printf 'vdlc.roboco.io\n' > docs/public/CNAME
```

(VitePress는 `docs/public/`의 파일을 dist 루트로 복사한다.)

- [ ] **Step 3: 로컬 재빌드 검증 + Commit**

Run: `npm run docs:build && ls docs/.vitepress/dist/CNAME`
Expected: CNAME 파일 존재

```bash
git add .github/ docs/public/CNAME
git commit -m "feat: GitHub Pages 배포 워크플로 및 커스텀 도메인"
```

### Task 12: GitHub 리포 생성·푸시·Pages 설정

**Files:** 없음 (원격 설정)

**Interfaces:**
- Consumes: 완성된 로컬 리포
- Produces: https://vdlc.roboco.io 라이브 사이트

- [ ] **Step 1: 리포 생성 및 푸시**

계정 라우팅: roboco-io → serithemage (gh 래퍼가 자동 전환, 실패 시 `gh auth switch --user serithemage`).

```bash
gh repo create roboco-io/vibe-driven-development-lifecycle --public \
  --description "VDLC: Vibe-Driven Development Lifecycle — vdlc.roboco.io" \
  --source . --push
```

- [ ] **Step 2: Pages 설정 (Actions 소스 + 커스텀 도메인)**

```bash
gh api -X POST repos/roboco-io/vibe-driven-development-lifecycle/pages \
  -f build_type=workflow || \
gh api -X PUT repos/roboco-io/vibe-driven-development-lifecycle/pages \
  -f build_type=workflow
gh api -X PUT repos/roboco-io/vibe-driven-development-lifecycle/pages \
  -f cname=vdlc.roboco.io
```

- [ ] **Step 3: 배포 확인**

Run: `gh run watch $(gh run list --workflow deploy.yml -L 1 --json databaseId -q '.[0].databaseId')`
Expected: 워크플로 성공

Run: `curl -sI https://roboco-io.github.io/vibe-driven-development-lifecycle/ | head -1` 또는 Pages API로 상태 확인
Expected: 배포 완료 상태

- [ ] **Step 4: DNS 안내 (사용자 수동 작업)**

사용자에게 안내: DNS 콘솔에서 `vdlc` CNAME 레코드 → `roboco-io.github.io` 추가. 전파 후 HTTPS 인증서 자동 발급 확인(`gh api repos/roboco-io/vibe-driven-development-lifecycle/pages -q '.https_certificate.state'`).
