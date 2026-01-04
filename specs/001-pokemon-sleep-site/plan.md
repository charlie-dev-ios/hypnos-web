# Implementation Plan: ポケモンスリープ攻略サイト

**Branch**: `001-pokemon-sleep-site` | **Date**: 2026-01-02 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-pokemon-sleep-site/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

ポケモンスリープの攻略情報を提供する日本語Webサイトを構築します。トップ画面からポケモン図鑑、ゲームメカニクス、戦略、料理、島などのコンテンツセクションにアクセスできるナビゲーション中心の設計で、デスクトップとモバイルの両方に対応したレスポンシブデザインを実装します。UIコンポーネントはshadcn/uiを活用し、開発効率を向上させます。

## Technical Context

**Language/Version**: TypeScript (最新安定版)
**Primary Dependencies**:
- **フレームワーク**: Next.js 15 (App Router) - React ベースのフルスタックフレームワーク
- **UIコンポーネント**: shadcn/ui - 事前構築されたアクセシブルなコンポーネント
- **スタイリング**: Tailwind CSS - ユーティリティファーストCSS
- **バリデーション**: Zod - TypeScript対応のスキーマバリデーション
- **ランタイム/パッケージマネージャー**: Bun - 高速なJavaScriptランタイム（constitution準拠）

**Storage**: ファイルベース（JSON/Markdown）- 手動コンテンツ管理用、DBは不要
**Testing**: Vitest + React Testing Library - ユニット・統合テスト
**Target Platform**: Webブラウザ（デスクトップ、タブレット、モバイル対応）
**Project Type**: Web（Next.js SSG/SSR）
**Performance Goals**:
- ページ読み込み時間 < 3秒（標準ブロードバンド接続）
- Lighthouse スコア > 90（Performance, Accessibility）

**Constraints**:
- 日本語コンテンツのみ
- モバイルファースト設計（320px〜768px対応）
- コンテンツ更新は手動（CMSなし）
- 横スクロール禁止

**Scale/Scope**:
- 初期コンテンツページ数: 50-100ページ想定
- ポケモン数: 100-200体程度
- 同時接続ユーザー: 〜1000人想定
- コンテンツセクション: 6セクション（ポケモン図鑑、ゲームメカニクス、戦略、チーム編成、料理、島）

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### ✅ I. Test-Driven Development (NON-NEGOTIABLE)
- **Status**: COMPLIANT
- **Plan**: Vitest + React Testing Libraryを使用してTDDサイクルを実施
- **Test Strategy**:
  - コンポーネントテスト: shadcn/uiコンポーネントの統合テスト
  - ユニットテスト: データ処理ロジック、検索/フィルター機能
  - 統合テスト: ナビゲーションフロー、コンテンツ読み込み
  - E2Eテスト（オプション): Playwright使用を検討

### ✅ II. AI-First Development
- **Status**: COMPLIANT
- **Alignment**:
  - `.specify/` ディレクトリで仕様管理中
  - 明確なドキュメント構造（spec.md, plan.md）
  - 機械可読なデータモデル定義予定

### ✅ III. Simplicity (YAGNI)
- **Status**: COMPLIANT
- **Simple Choices**:
  - ファイルベースのコンテンツ管理（DB不要）
  - 静的サイト生成優先（Next.js SSG）
  - 標準的なNext.js App Router構造
  - shadcn/ui使用で独自コンポーネント開発を最小化

### ✅ Technology Stack Alignment
- **Status**: COMPLIANT
- **Alignment**:
  - TypeScript全レイヤーで統一 ✓
  - Bun をランタイム・パッケージマネージャーとして使用 ✓
  - Zodスキーマでバリデーション統一 ✓
  - 型安全性を最大限活用 ✓

### ✅ Git Commit規約
- **Status**: COMPLIANT
- **Plan**: Conventional Commits（日本語説明文）を使用

**Overall Gate Status**: ✅ PASS - 全チェック項目準拠、Phase 0に進行可能

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
pokemon-sleep-site/          # プロジェクトルート
├── app/                     # Next.js App Router（ページとレイアウト）
│   ├── (home)/             # トップページグループ
│   │   └── page.tsx        # トップ画面（カードナビゲーション）
│   ├── pokemon/            # ポケモン図鑑セクション
│   │   ├── page.tsx        # ポケモン一覧ページ
│   │   └── [id]/           # 個別ポケモン詳細ページ
│   │       └── page.tsx
│   ├── mechanics/          # ゲームメカニクスガイド
│   │   └── page.tsx
│   ├── strategies/         # 睡眠戦略ガイド
│   │   └── page.tsx
│   ├── teams/              # チーム編成ガイド
│   │   └── page.tsx
│   ├── recipes/            # 料理情報
│   │   └── page.tsx
│   ├── islands/            # 島ガイド
│   │   └── page.tsx
│   ├── layout.tsx          # ルートレイアウト（共通ヘッダー/ナビ）
│   └── globals.css         # グローバルスタイル
│
├── components/             # Reactコンポーネント
│   ├── ui/                # shadcn/ui コンポーネント（自動生成）
│   │   ├── card.tsx
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── navigation/        # ナビゲーション関連
│   │   ├── top-nav.tsx   # トップナビゲーション（カード）
│   │   ├── mobile-nav.tsx # モバイルハンバーガーメニュー
│   │   └── breadcrumb.tsx
│   ├── pokemon/           # ポケモン関連コンポーネント
│   │   ├── pokemon-card.tsx
│   │   ├── pokemon-list.tsx
│   │   ├── pokemon-detail.tsx
│   │   └── pokemon-search.tsx
│   └── common/            # 共通コンポーネント
│       ├── loading-indicator.tsx
│       └── search-bar.tsx
│
├── lib/                   # ユーティリティ・ロジック
│   ├── data/             # データ取得・処理
│   │   ├── pokemon.ts    # ポケモンデータ操作
│   │   ├── content.ts    # コンテンツファイル読み込み
│   │   └── search.ts     # 検索・フィルター・ソート
│   ├── schemas/          # Zod バリデーションスキーマ
│   │   ├── pokemon.ts
│   │   ├── berry.ts
│   │   └── skill.ts
│   └── utils.ts          # 汎用ヘルパー関数
│
├── content/              # コンテンツファイル（手動管理）
│   ├── pokemon/         # ポケモンデータ（JSON）
│   │   ├── pokemon.json
│   │   └── evolutions.json
│   ├── mechanics/       # ゲームメカニクス（Markdown）
│   │   └── sleep-types.md
│   ├── strategies/      # 戦略ガイド（Markdown）
│   └── recipes/         # 料理データ（JSON）
│
├── tests/               # テストファイル
│   ├── unit/           # ユニットテスト
│   │   ├── lib/
│   │   └── components/
│   ├── integration/    # 統合テスト
│   │   └── navigation.test.tsx
│   └── setup.ts        # テスト設定
│
├── public/             # 静的アセット
│   ├── images/
│   │   ├── pokemon/   # ポケモン画像
│   │   └── icons/     # アイコン
│   └── favicon.ico
│
└── config files
    ├── next.config.js       # Next.js設定
    ├── tailwind.config.ts   # Tailwind CSS設定
    ├── tsconfig.json        # TypeScript設定
    ├── vitest.config.ts     # Vitest設定
    ├── components.json      # shadcn/ui設定
    └── bunfig.toml          # Bun設定
```

**Structure Decision**: Next.js App Router構造を採用。ファイルベースルーティングでページを管理し、shadcn/uiコンポーネントを`components/ui/`に配置。コンテンツは`content/`ディレクトリでJSON/Markdown形式で手動管理。Constitution原則に従いシンプルな構造を維持。

## Complexity Tracking

**Status**: No violations - 全てConstitution準拠

このプロジェクトは以下の理由でConstitutionの複雑性ガイドラインに完全に準拠しています：

- シンプルな単一プロジェクト構造（Next.js）
- データベース不要（ファイルベース）
- 標準的なNext.js App Routerパターン使用
- shadcn/ui活用で独自実装を最小化
- YAGNI原則遵守（必要最小限の機能のみ）
