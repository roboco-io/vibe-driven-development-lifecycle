# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repo Is

VDLC(Vibe-Driven Development Lifecycle) 방법론의 문서 사이트(https://vdlc.roboco.io)와 발표 덱. 애플리케이션 코드가 아니라 콘텐츠 저장소이므로, 대부분의 작업은 마크다운 편집과 다국어 일관성 유지다. 테스트는 없고 빌드 성공(깨진 내부 링크는 빌드 실패로 잡힘)이 검증 수단이다.

## Commands

```bash
npm run docs:dev       # VitePress 개발 서버
npm run docs:build     # 프로덕션 빌드 — 콘텐츠 변경 후 필수 검증
npm run docs:preview   # 빌드 결과 로컬 확인

cd slides
npm run dev            # Slidev 개발 서버
npm run build          # 슬라이드 빌드 (--base /slides/)
```

배포: `main` 푸시 시 GitHub Actions가 docs와 slides를 각각 빌드한 뒤 `slides/dist`를 `docs/.vitepress/dist/slides`로 복사해 GitHub Pages에 올린다. main 직행 커밋이 관례이며 remote는 origin 하나다.

## Content Architecture — 원본과 전파 사슬

콘텐츠 변경 시 반드시 따라야 하는 동기화 순서가 있다:

```
vdlc.md (한국어 매니페스토 원문 = source of truth)
  → docs/ko/manifesto.md (사이트판 미러; 플레이북 링크가 추가된 것 외 동일)
  → docs/manifesto.md (영문), docs/ja/manifesto.md (일문)
  → docs/{,ko/,ja/}index.md 랜딩, guide/adoption 관련 페이지
  → slides/slides.md (요약판)
```

`vdlc.md`만 고치고 끝내면 안 된다. 원칙 개수("여섯 가지 원칙"), 문제 개수("네 가지 문제"), 진단 문항 수("18문항") 같은 개수 표현은 여러 파일에 흩어져 있으므로, 변경 시 넓은 패턴으로 전수 grep 한다(예: `grep -r "여섯 가지\|네 가지\|18문항" docs`).

## i18n 구조

- **영문이 루트 로케일**: `docs/*.md`. 한국어는 `docs/ko/`, 일본어는 `docs/ja/`.
- 내부 절대 링크는 로케일 접두사를 따른다: 영문 `](/guide/verify)`, 한국어 `](/ko/guide/verify)`, 일본어 `](/ja/guide/verify)`. frontmatter의 `link:` 값(랜딩 hero actions)도 동일.
- `docs/.vitepress/config.ts`는 `localeThemeConfig()` 헬퍼로 로케일별 nav/sidebar를 생성한다. 페이지를 추가·삭제하면 이 헬퍼의 링크 배열과 3개 로케일 문자열을 함께 갱신한다.
- 슬라이드는 한국어만 존재하므로 영문·일문 nav에서 "Slides (KO)"로 표기한다.
- README는 3벌: `README.md`(영문 기본) + `README.ko.md` + `README.ja.md`, 상단에 언어 전환 링크. 내용 수정 시 3벌 동기화.

## Writing Conventions

- 한국어: -다 문어체. 일본어: だ・である体. 삭제선(~~) 사용 금지.
- 가이드 페이지(`guide/*.md`)는 6섹션 고정 구조: 이 단계의 목적 / 실행 순서 / 산출물 / 완료 기준 체크리스트 / 흔한 실수 / "Claude Code로 하면". 마지막 섹션은 도구 중립 본문 뒤에 오는 `::: tip`(제목 없음) 블록이며, 영문 "With Claude Code", 일문 「Claude Codeなら」.
- 성숙도 4레벨 표기 고정: 탐색(Exploring)/실천(Practicing)/자산화(Compounding)/표준화(Systematizing).
- 측정 지표 4종 고정: 사이클 리드타임, 재작업률, 검증 통과율(1회 통과 비율), 컨텍스트 자산 증가량.
- 도입 로드맵 단계 표기: ko "걸음 1~4", en "Step 1–4", ja "ステップ1~4".
- 성숙도 셀프 진단은 원칙별 3문항 × 6원칙 = 18문항이며, 레벨 판정은 Q1/Q2/Q3 계열별 집계(각 6문항 중 3개 이상). 문항을 늘리면 판정 규칙 서술과 `adoption/index.md`의 문항 수 표기도 갱신해야 한다.

## Slides Notes

- `slides/slides.md`의 frontmatter에 `routerMode: hash`가 설정돼 있다(GitHub Pages 새로고침 404 방지). 제거하지 말 것.
- mermaid 다이어그램(라이프사이클 6단계)은 사이트 랜딩·매니페스토·슬라이드에 같은 구조로 존재한다 — 노드 ID(P1~P6, H, A)를 공유하므로 구조 변경 시 함께 수정.

## specs/

설계·계획 문서 보관소. brainstorming → writing-plans 스킬 체인의 산출물을 `specs/YYYY-MM-DD-<topic>-{design,plan}.md`로 저장하는 관례다(기본 경로인 docs/superpowers/ 대신 이곳 사용).
