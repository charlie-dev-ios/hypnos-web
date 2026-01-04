# コードベース構造

## リポジトリ全体構造

```
hashibiroko/
├── apps/                      # アプリケーション
│   ├── web/                   # Next.js Webフロントエンド
│   └── api/                   # Hono APIバックエンド
├── packages/                  # 共通パッケージ（予定）
│   └── shared/                # 共通パッケージ（型、スキーマ）
├── docs/                      # ドキュメント
│   └── architecture.md        # アーキテクチャ設計
├── specs/                     # speckit 仕様書
├── .specify/                  # speckit ツール設定
│   ├── memory/
│   │   └── constitution.md    # 開発原則
│   └── scripts/
├── .claude/                   # Claude設定
├── .github/                   # GitHub Actions等
├── .vscode/                   # VSCode設定
├── turbo.json                 # Turborepo設定
├── package.json               # ワークスペースルート
├── bun.lockb                  # Bunロックファイル
├── CLAUDE.md                  # Claude向けガイドライン
└── README.md                  # プロジェクト概要
```

## apps/web（Next.js Webアプリ）

```
apps/web/
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── layout.tsx         # ルートレイアウト
│   │   ├── page.tsx           # トップページ
│   │   ├── globals.css        # グローバルスタイル
│   │   └── favicon.ico
│   ├── components/            # UIコンポーネント
│   │   └── ui/                # shadcn/ui コンポーネント
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── checkbox.tsx
│   │       ├── input.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       └── skeleton.tsx
│   ├── hooks/                 # カスタムフック
│   ├── lib/                   # ユーティリティ
│   │   ├── utils.ts           # 汎用ユーティリティ
│   │   ├── data/              # データ取得・操作
│   │   │   ├── content.ts
│   │   │   └── pokemon.ts
│   │   └── schemas/           # Zodスキーマ定義
│   │       ├── berry.ts
│   │       ├── content.ts
│   │       ├── island.ts
│   │       ├── pokemon.ts
│   │       ├── recipe.ts
│   │       └── skill.ts
│   ├── stores/                # 状態管理（Zustand予定）
│   └── content/               # コンテンツデータ
│       ├── berries/
│       ├── islands/
│       ├── mechanics/
│       │   └── sleep-types.md
│       ├── pokemon/
│       │   └── pokemon.json
│       ├── recipes/
│       ├── skills/
│       ├── strategies/
│       └── teams/
├── tests/                     # テストファイル
│   └── setup.ts               # Vitestセットアップ
├── public/                    # 静的ファイル
├── .next/                     # Next.jsビルド出力
├── vitest.config.ts           # Vitest設定
├── eslint.config.mjs          # ESLint設定
├── tsconfig.json              # TypeScript設定
├── next.config.ts             # Next.js設定
├── postcss.config.mjs         # PostCSS設定
├── components.json            # shadcn/ui設定
└── package.json               # 依存関係とスクリプト
```

## apps/api（Hono APIバックエンド）

```
apps/api/
├── src/
│   ├── index.ts               # エントリーポイント
│   ├── routes/                # APIルート（予定）
│   ├── services/              # ビジネスロジック（予定）
│   ├── db/                    # Drizzle スキーマ・クエリ（予定）
│   └── middleware/            # 認証等（予定）
├── tsconfig.json              # TypeScript設定
└── package.json               # 依存関係とスクリプト
```

## 主要な設定ファイル

- **turbo.json**: Turborepoタスク定義（build, dev）
- **tsconfig.json**: TypeScript設定（strict mode, paths）
- **eslint.config.mjs**: ESLint設定（Next.js公式）
- **vitest.config.ts**: Vitestテスト設定（jsdom環境）
- **next.config.ts**: Next.js設定
- **.mise.toml**: 開発ツールバージョン管理
