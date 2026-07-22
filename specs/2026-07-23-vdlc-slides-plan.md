# VDLC 슬라이드 덱 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** VDLC 사이트 콘텐츠를 요약한 강연용 Slidev 덱(약 30장)을 만들어 https://vdlc.roboco.io/slides/ 로 배포한다.

**Architecture:** `slides/`에 독립 Slidev 프로젝트(자체 package.json). 로컬/CI에서 `slidev build --base /slides/`로 빌드해 VitePress dist의 `slides/`에 병합한 뒤 기존 Pages 업로드 흐름에 태운다. 콘텐츠는 docs/ 페이지의 요약이며 새 주장을 추가하지 않는다.

**Tech Stack:** Slidev(@slidev/cli 최신), seriph 테마, 기존 GitHub Actions deploy.yml 확장.

## Global Constraints

- 어조: 사이트와 동일한 -다 문어체, 도구 중립. 삭제선(`~~`) 금지.
- 장당 메시지 하나, 텍스트 밀도 낮게 (발표자 구두 설명 전제). 총 30장 ±3장.
- 사례 슬라이드는 정성적 서술만 — 구체 수치 금지.
- 성숙도 표기 고정: 탐색(Exploring)/실천(Practicing)/자산화(Compounding)/표준화(Systematizing). 지표 4종 고정: 사이클 리드타임, 재작업률, 검증 통과율(1회 통과 비율), 컨텍스트 자산 증가량.
- 브랜드 컬러 #3451b2, 로고는 `docs/public/logo.svg` 재사용.
- 커밋: conventional commits + `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.
- 기존 docs/ 콘텐츠 파일은 수정하지 않는다 (config.ts nav 추가만 예외).

---

### Task 1: Slidev 프로젝트 스캐폴드

**Files:**
- Create: `slides/package.json`
- Create: `slides/slides.md` (임시 2장 — Task 2에서 전문으로 대체)
- Create: `slides/public/logo.svg` (docs/public/logo.svg 복사)
- Modify: `.gitignore` (slides 관련 항목 추가)

**Interfaces:**
- Produces: `cd slides && npm run build` → `slides/dist/index.html` 생성. Task 2는 slides.md를 전문으로 교체하고, Task 3은 이 빌드 명령을 CI에 통합한다.

- [ ] **Step 1: package.json 작성 및 설치**

`slides/package.json`:

```json
{
  "name": "vdlc-slides",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "slidev slides.md",
    "build": "slidev build slides.md --base /slides/ --out dist"
  }
}
```

```bash
mkdir -p slides/public && cp docs/public/logo.svg slides/public/logo.svg
cd slides && npm install -D @slidev/cli @slidev/theme-seriph
```

- [ ] **Step 2: 임시 slides.md 작성 (스캐폴드 검증용)**

```markdown
---
theme: seriph
title: "VDLC — Vibe-Driven Development Lifecycle"
titleTemplate: "%s"
lang: ko
colorSchema: dark
fonts:
  sans: Noto Sans KR
class: text-center
---

# VDLC

바이브코딩을 전제로 재설계한 소프트웨어 개발 생명주기

---

# 스캐폴드 확인

빌드 파이프라인 검증용 임시 슬라이드다.
```

- [ ] **Step 3: .gitignore 갱신**

리포 루트 `.gitignore`에 추가:

```
slides/node_modules/
slides/dist/
```

- [ ] **Step 4: 빌드 검증**

Run: `cd slides && npm run build 2>&1 | tail -5 && ls dist/index.html`
Expected: 빌드 성공, `dist/index.html` 존재. base 확인: `grep -o '/slides/assets' dist/index.html | head -1` → `/slides/assets`

- [ ] **Step 5: Commit**

```bash
git add slides/package.json slides/package-lock.json slides/slides.md slides/public/logo.svg .gitignore
git commit -m "feat: Slidev 슬라이드 프로젝트 스캐폴드"
```

### Task 2: 덱 전문 작성 (약 30장)

**Files:**
- Modify: `slides/slides.md` (전문 교체)

**Interfaces:**
- Consumes: Task 1의 frontmatter 설정(테마·폰트·base). 콘텐츠 소스: `vdlc.md`, `docs/manifesto.md`, `docs/guide/*.md`, `docs/cases/*.md`, `docs/adoption/*.md`.
- Produces: 최종 덱. Task 3이 그대로 배포.

- [ ] **Step 1: 덱 전문 작성**

스펙 §3의 30장 구성을 그대로 따른다. frontmatter는 Task 1의 것을 유지하고 타이틀 장부터 시작한다. 구성 요약(각 장의 소스):

| 장 | 내용 | 소스 |
|---|---|---|
| 1 | 타이틀 (로고 + 부제) | — |
| 2 | 바이브코딩의 등장 — 코드 작성 비용 0 수렴 | manifesto §2 |
| 3 | 병목의 이동 (구현→의도 정의·검증) | manifesto §2 |
| 4 | 3가지 문제: 속도 불균형·품질 리스크·지식 휘발 | manifesto §2 |
| 5 | VDLC 정의 + 핵심 명제 | manifesto §1 |
| 6–10 | 5원칙 장당 1개 | manifesto §3 |
| 11 | 6단계 mermaid 다이어그램 | manifesto §4 (```mermaid 블록 그대로) |
| 12–17 | 단계별 1장: 핵심 행동 2~3개 + 흔한 실수 1개 | docs/guide/ 각 페이지 |
| 18 | 역할 3분화 | manifesto §5 |
| 19 | 산출물 비교표 | manifesto §6 표 |
| 20 | 기존 방법론과의 관계 | manifesto §7 |
| 21–22 | 안티패턴 4종 (2장×2개) | manifesto §8 |
| 23–24 | 사례 요약 각 1장 (정성 서술만) | docs/cases/ |
| 25 | 성숙도 4레벨 | docs/adoption/maturity.md |
| 26 | 지표 4종 | docs/adoption/metrics.md |
| 27 | 도입 로드맵 4걸음 | docs/adoption/roadmap.md |
| 28 | 핵심 명제 재강조 | manifesto 맺으며 |
| 29–30 | vdlc.roboco.io 안내 + 감사 | — |

작성 규칙:
- 슬라이드 구분은 `---`, 섹션 전환 장은 `layout: section` 또는 `layout: center` 활용.
- 장당 불릿 최대 4개, 불릿당 한 줄. 문장보다 구 위주로 압축하되 어미가 있는 문장은 -다체.
- mermaid는 Slidev 내장 지원: ```mermaid 코드펜스 그대로.
- 표는 19·25·26장에만 사용 (성숙도·지표·산출물 비교).
- 마지막 장에 `https://vdlc.roboco.io` 명시.

- [ ] **Step 2: 빌드·분량 검증**

Run: `cd slides && npm run build 2>&1 | tail -3`
Expected: 성공

Run: `grep -c '^---$' slides/slides.md`
Expected: 슬라이드 구분자 기준 약 28~34 (frontmatter 구분자 포함 계수이므로 ±1 허용)

Run: `grep -n '~~' slides/slides.md`
Expected: 출력 없음

- [ ] **Step 3: Commit**

```bash
git add slides/slides.md
git commit -m "docs: VDLC 발표 덱 전문 (약 30장)"
```

### Task 3: 배포 통합

**Files:**
- Modify: `.github/workflows/deploy.yml` (build job에 슬라이드 스텝 추가)
- Modify: `docs/.vitepress/config.ts` (nav에 슬라이드 항목)

**Interfaces:**
- Consumes: Task 1·2의 `slides/` 빌드 (`npm ci && npm run build` → `slides/dist/`)
- Produces: Pages 아티팩트에 `slides/` 경로 포함, 사이트 nav 링크

- [ ] **Step 1: deploy.yml의 build job 수정**

기존 `- run: npm run docs:build` 스텝 뒤, `configure-pages` 스텝 앞에 추가:

```yaml
      - run: npm ci
        working-directory: slides
      - run: npm run build
        working-directory: slides
      - run: cp -r slides/dist docs/.vitepress/dist/slides
```

또한 setup-node의 캐시가 두 lockfile을 모두 보도록 수정:

```yaml
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
          cache-dependency-path: |
            package-lock.json
            slides/package-lock.json
```

- [ ] **Step 2: config.ts nav에 슬라이드 항목 추가**

`docs/.vitepress/config.ts`의 nav 배열 마지막에:

```ts
        { text: "슬라이드", link: "/slides/", target: "_blank" },
```

- [ ] **Step 3: 로컬 병합 빌드 검증**

Run: `npm run docs:build 2>&1 | tail -3 && (cd slides && npm run build 2>&1 | tail -3) && cp -r slides/dist docs/.vitepress/dist/slides && ls docs/.vitepress/dist/slides/index.html`
Expected: 두 빌드 성공, `dist/slides/index.html` 존재

- [ ] **Step 4: Commit & Push**

```bash
git add .github/workflows/deploy.yml docs/.vitepress/config.ts
git commit -m "feat: 슬라이드 빌드·배포 통합 (nav 링크 포함)"
git push origin main
```

- [ ] **Step 5: 배포 확인**

Run: `RUN_ID=$(gh run list --workflow deploy.yml -L 1 --json databaseId --jq '.[0].databaseId'); gh run watch "$RUN_ID" --exit-status`
Expected: success

Run: `curl -sI https://vdlc.roboco.io/slides/ | head -1`
Expected: `HTTP/2 200`
