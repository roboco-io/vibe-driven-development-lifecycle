import { withMermaid } from "vitepress-plugin-mermaid";
import { defineConfig } from "vitepress";

export default withMermaid(
  defineConfig({
    lang: "ko-KR",
    title: "VDLC",
    description: "Vibe-Driven Development Lifecycle — 바이브코딩을 전제로 재설계한 소프트웨어 개발 생명주기",
    head: [
      ["link", { rel: "icon", href: "/favicon.ico", sizes: "48x48" }],
      ["link", { rel: "icon", href: "/logo.svg", type: "image/svg+xml" }],
      ["link", { rel: "apple-touch-icon", href: "/apple-touch-icon.png" }],
    ],
    themeConfig: {
      logo: "/logo.svg",
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
