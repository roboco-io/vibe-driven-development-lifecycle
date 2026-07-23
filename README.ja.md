# VDLC — Vibe-Driven Development Lifecycle

[English](README.md) | [한국어](README.ko.md) | **日本語**

AIエージェントがコード実装の主体となる時代に合わせて再設計したソフトウェア開発ライフサイクルである。核心となる命題はひとつ。**意図とコンテキストが一次成果物であり、コードはそこから再生成可能な二次成果物である。**

📖 **ウェブサイト: https://vdlc.roboco.io** ([English](https://vdlc.roboco.io) · [한국어](https://vdlc.roboco.io/ko/) · 日本語は [/ja/](https://vdlc.roboco.io/ja/))

## VDLCとは

VDLCは、従来のSDLCの実装ステージにAIを組み込むのではなく、バイブコーディングを前提に開発プロセス全体を作り直したものである。構成は次のとおり。

- **6つの原則** — 意図がソースだ / 人間は判断し、AIは実行する / 速度は検証が決める / コンテキストは資産だ / 小さく回し、頻繁に還流する / 理解が所有だ
- **6ステージのライフサイクル** — 意図定義 → コンテキスト設計 → 共同構築 → 検証 → デプロイと観察 → 還流。ステージ1·2·6は人間主導・AI補助、ステージ3·4·5はAI主導・人間の関門(計画承認、最終レビュー、デプロイ承認)
- **実務資産** — ステージ別プレイブック、文書テンプレート、成熟度モデル、導入ロードマップ、測定指標

## リポジトリ構成

| パス | 説明 |
|---|---|
| `docs/` | VitePressサイト — ルートは英語、韓国語は `ko/`、日本語は `ja/` |
| `slides/` | Slidevプレゼンテーションデッキ(韓国語)、`/slides/` に配置 |
| `vdlc.md` | 韓国語マニフェスト原文(韓国語テキストの原本) |
| `specs/` | 設計・計画文書 |

## 開発

```bash
npm install
npm run docs:dev     # 開発サーバー
npm run docs:build   # プロダクションビルド

cd slides
npm install
npm run dev          # スライド開発サーバー
npm run build        # スライドビルド
```

`main` にプッシュすると GitHub Actions がサイトとスライドをビルドし、GitHub Pages にデプロイする。
