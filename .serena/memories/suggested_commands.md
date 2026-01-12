# 開発コマンド

## プロジェクトルート

### 依存関係のインストール
```bash
bun install
```

### すべてのアプリの開発サーバー起動
```bash
bun dev
```

### すべてのアプリをビルド
```bash
bun build
```

## apps/web（Webフロントエンド）

### カレントディレクトリを移動
```bash
cd apps/web
```

### 開発サーバー起動（ポート3030）
```bash
bun dev
```

### ビルド
```bash
bun build
```

### テスト実行
```bash
bun run test
```

### テストをwatchモードで実行
```bash
bun run test:watch
```

## apps/api（APIバックエンド）※開発中

### カレントディレクトリを移動
```bash
cd apps/api
```

### 開発サーバー起動（ポート8787予定）
```bash
bun dev
```

### ビルド
```bash
bun build
```

## Gitコマンド（Darwin/macOS対応）

### ステータス確認
```bash
git status
```

### 変更の確認
```bash
git diff
```

### 変更をステージング
```bash
git add .
```

### コミット（Conventional Commits形式、日本語）
```bash
git commit -m "feat(scope): 説明"
```

### プッシュ
```bash
git push
```

## システムユーティリティコマンド（Darwin/macOS）

### ディレクトリ一覧
```bash
ls -la
```

### ファイル検索
```bash
find . -name "*.tsx"
```

### パターン検索
```bash
grep -r "pattern" .
```

### カレントディレクトリ移動
```bash
cd <path>
```

## 開発ワークフロー

1. ブランチ作成: `git checkout -b feature/xxx` or `git checkout -b fix/xxx`
2. 開発サーバー起動: `bun dev` (ルート) or `cd apps/web && bun dev`
3. テスト実行（TDD）: `cd apps/web && bun run test:watch`
4. コミット: `git commit -m "feat(scope): 説明"`
5. プッシュ: `git push`
