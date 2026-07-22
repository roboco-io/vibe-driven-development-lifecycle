# VDLC 슬라이드 덱 설계 문서

- 날짜: 2026-07-23
- 상태: 승인됨
- 소스: `docs/` 사이트 콘텐츠 및 `vdlc.md`

## 1. 목적

강연/발표용 풀 덱(약 30장). 발표자가 구두로 설명하는 전제로 장당 메시지 하나, 텍스트 밀도 낮게. `https://vdlc.roboco.io/slides/`로 배포.

## 2. 핵심 결정

| 항목 | 결정 |
|---|---|
| 도구 | Slidev (기본 seriph 테마 + 브랜드 컬러 #3451b2, 사이트 로고 재사용) |
| 위치 | `slides/` 독립 프로젝트 (자체 package.json, 루트 VitePress와 의존성 분리) |
| 배포 | `slidev build --base /slides/` 산출물을 VitePress dist의 `slides/`에 병합, 기존 deploy.yml 확장 |
| 사이트 연결 | VitePress nav에 "슬라이드" 항목 추가 (`https://vdlc.roboco.io/slides/`) |
| 어조 | 사이트와 동일 (-다 문어체, 도구 중립) |
| 사례 | 정성적 서술만 (구체 수치 없음, 검수 주석 불필요) |
| PDF | CI 미포함, 필요 시 로컬 `slidev export` (YAGNI) |

## 3. 덱 구성 (약 30장)

| 구간 | 장 | 내용 |
|---|---|---|
| 오프닝 | 1 | 타이틀 (VDLC 로고, 부제 "바이브코딩을 전제로 재설계한 소프트웨어 개발 생명주기") |
| | 2 | 바이브코딩의 등장 — 코드 작성 비용 0 수렴 |
| | 3 | 그러나 생명주기는 그대로 — 병목의 이동 (구현→의도 정의·검증) |
| | 4 | 3가지 문제: 속도 불균형 · 품질 리스크(AI 슬롭) · 지식 휘발 |
| 정의·원칙 | 5 | VDLC 정의 + 핵심 명제 ("의도와 컨텍스트가 1차 산출물, 코드는 2차 산출물") |
| | 6–10 | 5원칙 장당 1개 (의도가 소스다 / 인간 판단·AI 실행 / 검증이 속도 / 컨텍스트는 자산 / 작게 돌리고 자주 환류) |
| 라이프사이클 | 11 | 6단계 사이클 mermaid 다이어그램 (vdlc.md 것 재사용) |
| | 12–17 | 단계별 1장: 핵심 행동 2~3개 + 흔한 실수 1개 (guide/ 페이지 요약) |
| 재정의 | 18 | 역할 3분화: 의도 설계자 · 오케스트레이터 · 검증자 |
| | 19 | 산출물 비교표 (전통 SDLC vs VDLC, manifesto §6 표 재사용) |
| | 20 | 기존 방법론과의 관계 (애자일·DevOps·TDD 계승, AI-DLC 상호보완) |
| 안티패턴 | 21–22 | 4대 안티패턴 2장 압축 (검증 없는 바이브 + 컨텍스트 없는 프롬프트 / 병목이 된 인간 + 전 구간 자동화 환상) |
| 실전 | 23–24 | 사례 요약 각 1장 (중견기업 레거시 팀 / 소규모 팀 신규 서비스, 정성 서술) |
| | 25 | 성숙도 4레벨 (탐색–실천–자산화–표준화) |
| | 26 | 측정 지표 4종 |
| | 27 | 도입 로드맵 4걸음 |
| 클로징 | 28 | 핵심 명제 재강조 |
| | 29–30 | vdlc.roboco.io 안내 (QR 또는 URL) + 감사 |

장수는 ±3장 유연. 콘텐츠는 docs/ 페이지의 요약이며 새 주장을 추가하지 않는다.

## 4. 기술 구성

```
slides/
├── package.json        # @slidev/cli, 테마
├── slides.md           # 덱 전문 (frontmatter로 테마·설정)
└── public/ → 사이트 logo.svg 복사 사용
.github/workflows/deploy.yml  # 슬라이드 빌드·병합 스텝 추가
docs/.vitepress/config.ts     # nav "슬라이드" 항목 추가
```

- 빌드 순서: VitePress 빌드 → `cd slides && npm ci && npx slidev build --base /slides/` → `cp -r slides/dist docs/.vitepress/dist/slides` → Pages 업로드.
- 로컬 검증: 두 빌드 모두 성공 + dist/slides/index.html 존재.
- .gitignore에 slides/node_modules, slides/dist 추가.

## 5. 범위 제외 (YAGNI)

- PDF 자동 생성(CI), 발표 녹화, 다국어 슬라이드
- 커스텀 Slidev 테마 제작 (기본 테마 + 색상 오버라이드로 충분)
