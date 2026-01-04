# 推奨コマンド

## 開発コマンド

### セットアップ

```bash
# 依存関係のインストール
bun install
```

### 開発サーバー起動

```bash
# すべてのアプリの開発サーバーを起動（Turborepo経由）
bun dev

# Webアプリのみ起動する場合
cd apps/web
bun dev  # localhost:3030で起動

# APIアプリのみ起動する場合
cd apps/api
bun dev  # localhost:8787で起動（予定）
```

### ビルド

```bash
# すべてのアプリをビルド（Turborepo経由）
bun build

# Webアプリのみビルド
cd apps/web
bun run build
```

### テスト

```bash
# Webアプリのテストを実行（Vitest）
cd apps/web
bun run test

# テストをwatchモードで実行
cd apps/web
bun run test --watch
```

### Linting

```bash
# Webアプリのlintを実行
cd apps/web
bunx eslint .

# 自動修正
cd apps/web
bunx eslint . --fix
```

## システムユーティリティコマンド（Darwin/macOS）

- `ls` - ファイル・ディレクトリ一覧
- `cd` - ディレクトリ移動
- `git` - バージョン管理
- `grep` - テキスト検索
- `find` - ファイル検索

## Git関連

```bash
# ステータス確認
git status

# ブランチ確認
git branch

# コミット
git add .
git commit -m "feat: 新機能を追加"

# プッシュ
git push origin <branch-name>
```

## speckit（仕様管理ツール）

プロジェクトはspeckitを使用して機能仕様を管理しています。

- 仕様書: `specs/` ディレクトリ
- ツール設定: `.specify/` ディレクトリ
