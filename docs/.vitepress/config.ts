import { withMermaid } from "vitepress-plugin-mermaid";
import { defineConfig } from "vitepress";

interface LocaleStrings {
  manifesto: string;
  guide: string;
  templates: string;
  adoption: string;
  slides: string;
  playbook: string;
  stages: [string, string, string, string, string, string];
  templateItems: [string, string, string, string, string, string];
  adoptionItems: [string, string, string, string];
}

function localeThemeConfig(prefix: string, t: LocaleStrings) {
  const p = prefix ? `/${prefix}` : "";
  const stageLinks = ["intent", "context", "build", "verify", "ship", "evolve"];
  const templateLinks = ["", "intent-doc", "pr-faq", "risk-matrix", "review-checklist", "claude-md"];
  const adoptionLinks = ["", "roadmap", "maturity", "metrics"];
  return {
    nav: [
      { text: t.manifesto, link: `${p}/manifesto` },
      { text: t.guide, link: `${p}/guide/intent` },
      { text: t.templates, link: `${p}/templates/` },
      { text: t.adoption, link: `${p}/adoption/` },
      { text: t.slides, link: "/slides/", target: "_blank" },
    ],
    sidebar: {
      [`${p}/guide/`]: [
        {
          text: t.playbook,
          items: t.stages.map((text, i) => ({ text, link: `${p}/guide/${stageLinks[i]}` })),
        },
      ],
      [`${p}/templates/`]: [
        {
          text: t.templates,
          items: t.templateItems.map((text, i) => ({ text, link: `${p}/templates/${templateLinks[i]}` })),
        },
      ],
      [`${p}/adoption/`]: [
        {
          text: t.adoption,
          items: t.adoptionItems.map((text, i) => ({ text, link: `${p}/adoption/${adoptionLinks[i]}` })),
        },
      ],
    },
  };
}

const en = localeThemeConfig("", {
  manifesto: "Manifesto",
  guide: "Guide",
  templates: "Templates",
  adoption: "Adoption",
  slides: "Slides (KO)",
  playbook: "6-Stage Playbook",
  stages: ["1. Intent", "2. Context", "3. Co-Construction", "4. Verification", "5. Ship & Observe", "6. Evolve"],
  templateItems: ["Overview", "Intent Document", "PR-FAQ", "Risk Matrix", "Review Checklist", "CLAUDE.md Example"],
  adoptionItems: ["Overview", "Roadmap", "Maturity Model", "Metrics"],
});

const ko = localeThemeConfig("ko", {
  manifesto: "매니페스토",
  guide: "가이드",
  templates: "템플릿",
  adoption: "도입",
  slides: "슬라이드",
  playbook: "6단계 플레이북",
  stages: ["1. 의도 정의", "2. 컨텍스트 설계", "3. 공동 구현", "4. 검증", "5. 배포와 관찰", "6. 환류"],
  templateItems: ["모음", "의도 문서", "PR-FAQ", "리스크 등급표", "리뷰 체크리스트", "CLAUDE.md 예시"],
  adoptionItems: ["개요", "도입 로드맵", "성숙도 모델", "측정 지표"],
});

const ja = localeThemeConfig("ja", {
  manifesto: "マニフェスト",
  guide: "ガイド",
  templates: "テンプレート",
  adoption: "導入",
  slides: "スライド (韓国語)",
  playbook: "6ステージ・プレイブック",
  stages: ["1. 意図定義", "2. コンテキスト設計", "3. 共同構築", "4. 検証", "5. デプロイと観察", "6. 還流"],
  templateItems: ["一覧", "意図文書", "PR-FAQ", "リスク等級表", "レビューチェックリスト", "CLAUDE.md例"],
  adoptionItems: ["概要", "導入ロードマップ", "成熟度モデル", "測定指標"],
});

export default withMermaid(
  defineConfig({
    title: "VDLC",
    head: [
      ["link", { rel: "icon", href: "/favicon.ico", sizes: "48x48" }],
      ["link", { rel: "icon", href: "/logo.svg", type: "image/svg+xml" }],
      ["link", { rel: "apple-touch-icon", href: "/apple-touch-icon.png" }],
    ],
    locales: {
      root: {
        label: "English",
        lang: "en-US",
        description: "Vibe-Driven Development Lifecycle — a software development lifecycle redesigned around vibe coding",
        themeConfig: {
          ...en,
          outline: { label: "On this page" },
          docFooter: { prev: "Previous", next: "Next" },
        },
      },
      ko: {
        label: "한국어",
        lang: "ko-KR",
        description: "Vibe-Driven Development Lifecycle — 바이브코딩을 전제로 재설계한 소프트웨어 개발 생명주기",
        themeConfig: {
          ...ko,
          outline: { label: "이 페이지에서" },
          docFooter: { prev: "이전", next: "다음" },
        },
      },
      ja: {
        label: "日本語",
        lang: "ja-JP",
        description: "Vibe-Driven Development Lifecycle — バイブコーディングを前提に再設計したソフトウェア開発ライフサイクル",
        themeConfig: {
          ...ja,
          outline: { label: "このページの内容" },
          docFooter: { prev: "前へ", next: "次へ" },
        },
      },
    },
    themeConfig: {
      logo: "/logo.svg",
      search: { provider: "local" },
      socialLinks: [
        { icon: "github", link: "https://github.com/roboco-io/vibe-driven-development-lifecycle" },
      ],
    },
  })
);
