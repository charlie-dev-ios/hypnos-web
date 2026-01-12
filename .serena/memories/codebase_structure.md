# コードベース構造

## ルートディレクトリ
```
hashibiroko/
├── apps/                     # アプリケーション
│   ├── web/                  # Next.js Webフロントエンド
│   └── api/                  # Hono API（開発中）
├── packages/                 # 共通パッケージ（今後作成予定）
│   └── shared/               # 型定義・スキーマ共有
├── docs/                     # ドキュメント
│   ├── architecture.md       # アーキテクチャ設計
│   ├── constitution.md       # 開発原則
│   └── development.md        # 開発ガイド
├── specs/                    # 機能仕様書（speckit）
│   ├── 001-pokemon-sleep-site/
│   └── 002-recipe-content/
├── .specify/                 # speckit設定
│   └── memory/
│       └── constitution.md   # 開発原則
├── .serena/                  # Serena設定
│   └── memories/             # Serenaメモリファイル
├── .claude/                  # Claude Code設定
│   ├── commands/             # カスタムコマンド
│   └── settings.json
├── README.md                 # プロジェクト概要
├── CLAUDE.md                 # AI開発ガイド
├── package.json              # ワークスペースルート
└── turbo.json                # Turborepo設定
```

## apps/web 構造
```
apps/web/
├── src/
│   ├── app/                  # App Router
│   │   ├── pokemon/          # ポケモン一覧・詳細
│   │   ├── recipes/          # 料理レシピ
│   │   ├── strategies/       # 攻略戦略
│   │   ├── islands/          # 島情報
│   │   ├── mechanics/        # ゲームメカニクス
│   │   ├── teams/            # チーム編成
│   │   └── api/              # Route Handlers
│   ├── components/           # UIコンポーネント
│   │   ├── ui/               # shadcn/ui コンポーネント
│   │   ├── pokemon/          # ポケモン関連
│   │   ├── recipes/          # レシピ関連
│   │   ├── navigation/       # ナビゲーション
│   │   └── common/           # 共通コンポーネント
│   ├── content/              # Markdownコンテンツ
│   ├── hooks/                # カスタムフック
│   ├── lib/                  # ユーティリティ
│   │   ├── utils/            # 汎用関数
│   │   └── schemas/          # Zodスキーマ
│   └── stores/               # Zustand状態管理
├── public/                   # 静的アセット
├── tests/                    # テストファイル
└── package.json
```

## apps/api 構造（開発中）
```
apps/api/
├── src/
│   └── (APIコード、開発中)
└── package.json
```
