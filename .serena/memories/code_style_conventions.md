# コードスタイルと規約

## ⚠️ Constitution遵守

**本ファイルの規約は `.specify/memory/constitution.md` で定義された原則に基づいています。**

必ず以下を遵守:
- **TDD必須**: すべての機能にテストを先に作成
- **Simplicity**: 不要な複雑さを避ける
- **Git Commit規約**: Conventional Commits（日本語メッセージ）

## TypeScript設定

### コンパイラーオプション（apps/web/tsconfig.json）

- **target**: ES2017
- **strict**: true（厳格モード）
- **module**: esnext
- **moduleResolution**: bundler
- **jsx**: react-jsx
- **paths**: `@/*` → `./src/*`（エイリアス設定）

### 型安全性

- TypeScriptを全レイヤーで統一使用
- Zodスキーマをフロント・バックエンドで共有
- 型安全性を最大限活用

## ESLint設定

- Next.js公式設定を使用（eslint-config-next）
  - core-web-vitals
  - typescript
- 無視パターン: `.next/**`, `out/**`, `build/**`, `next-env.d.ts`

## ディレクトリ構造

### Webアプリ（apps/web/src）

```
src/
├── app/            # Next.js App Router（ページ、レイアウト）
├── components/     # UIコンポーネント
│   └── ui/         # shadcn/ui コンポーネント
├── hooks/          # カスタムフック
├── lib/            # ユーティリティ
│   ├── data/       # データ取得・操作
│   └── schemas/    # Zodスキーマ定義
├── stores/         # 状態管理（Zustand予定）
└── content/        # コンテンツデータ（Markdown、JSON）
```

### APIアプリ（apps/api/src）

```
src/
├── routes/         # APIルート（予定）
├── services/       # ビジネスロジック（予定）
├── db/             # Drizzle スキーマ・クエリ（予定）
└── middleware/     # 認証等（予定）
```

## 命名規則

- **コンポーネント**: PascalCase（例: `Button.tsx`, `UserProfile.tsx`）
- **ユーティリティ関数**: camelCase
- **定数**: UPPER_SNAKE_CASE
- **ファイル名**: kebab-case または PascalCase（コンポーネント）

## Git Commit規約

[Conventional Commits](https://www.conventionalcommits.org/) を採用

**コミットメッセージは日本語で記述**（type部分は英語）

### フォーマット

```
<type>[optional scope]: <説明>

[optional body]

[optional footer(s)]
```

### Type 一覧

| Type | 説明 |
|------|------|
| `feat` | 新機能の追加 |
| `fix` | バグ修正 |
| `docs` | ドキュメントのみの変更 |
| `style` | コードの意味に影響しない変更（空白、フォーマット等） |
| `refactor` | バグ修正や機能追加を伴わないコード変更 |
| `perf` | パフォーマンス改善 |
| `test` | テストの追加・修正 |
| `chore` | ビルドプロセスや補助ツールの変更 |
| `ci` | CI設定の変更 |

### 例

```
feat(auth): ログイン機能を追加
fix(api): サーバーからのnullレスポンスを処理
docs: Constitutionにコミット規約を追記
test(user): ユーザーサービスのユニットテストを追加
```
