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
