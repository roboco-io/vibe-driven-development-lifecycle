# VDLC — Vibe-Driven Development Lifecycle

[English](README.md) | **한국어** | [日本語](README.ja.md)

AI 에이전트가 코드 구현의 주체가 되는 시대에 맞춰 재설계한 소프트웨어 개발 생명주기다. 핵심 명제는 하나다. **의도와 컨텍스트가 1차 산출물이고, 코드는 그로부터 재생성 가능한 2차 산출물이다.**

📖 **웹사이트: https://vdlc.roboco.io** ([English](https://vdlc.roboco.io) · 한국어는 [/ko/](https://vdlc.roboco.io/ko/) · [日本語](https://vdlc.roboco.io/ja/))

## VDLC란

VDLC는 기존 SDLC의 구현 단계에 AI를 끼워 넣는 대신, 바이브코딩을 전제로 개발 전 과정을 다시 세운다. 구성은 다음과 같다.

- **여섯 가지 원칙** — 의도가 소스다 / 인간은 판단하고, AI는 실행한다 / 속도는 검증이 결정한다 / 컨텍스트는 자산이다 / 작게 돌리고, 자주 환류한다 / 이해가 소유다
- **여섯 단계 라이프사이클** — 의도 정의 → 컨텍스트 설계 → 공동 구현 → 검증 → 배포와 관찰 → 환류. 1·2·6단계는 인간 주도·AI 보조, 3·4·5단계는 AI 주도·인간 관문(계획 승인, 최종 리뷰, 배포 승인)
- **실무 자산** — 단계별 플레이북, 문서 템플릿, 성숙도 모델, 도입 로드맵, 측정 지표

## 저장소 구조

| 경로 | 설명 |
|---|---|
| `docs/` | VitePress 사이트 — 루트는 영문, 한국어는 `ko/`, 일본어는 `ja/` |
| `slides/` | Slidev 발표 덱(한국어), `/slides/` 경로에 배포 |
| `vdlc.md` | 한국어 매니페스토 원문(한국어 텍스트의 원본) |
| `specs/` | 설계·계획 문서 |

## 개발

```bash
npm install
npm run docs:dev     # 개발 서버
npm run docs:build   # 프로덕션 빌드

cd slides
npm install
npm run dev          # 슬라이드 개발 서버
npm run build        # 슬라이드 빌드
```

`main`에 푸시하면 GitHub Actions가 사이트와 슬라이드를 빌드해 GitHub Pages로 배포한다.
