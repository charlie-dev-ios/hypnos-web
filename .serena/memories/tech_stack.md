# 技術スタック

## フロントエンド（Web）

| カテゴリ | 技術 | バージョン | 備考 |
|----------|------|-----------|------|
| フレームワーク | Next.js | 16.0.8 | App Router, Turbopack |
| UI Library | React | 19.2.1 | |
| UIコンポーネント | shadcn/ui | - | Radix UI ベース |
| 言語 | TypeScript | 5.9.3 | Strict mode有効 |
| スタイリング | Tailwind CSS | 4.x | |
| テスティング | Vitest | 4.0.16 | JSdom環境 |
| テストライブラリ | @testing-library/react | 16.3.1 | |
| フォーム | React Hook Form | - | （予定） |
| バリデーション | Zod | 4.3.4 | API と共通 |
| Linter | ESLint | 9.x | Next.js設定 |
| デプロイ | Vercel | - | |

## バックエンド（API）

| カテゴリ | 技術 | バージョン | 備考 |
|----------|------|-----------|------|
| 言語 | TypeScript | 5.x | フロントと統一 |
| フレームワーク | Hono | 4.11.2 | Edge対応 |
| データベース | Supabase | - | PostgreSQL（予定） |
| ORM | Drizzle | - | 型安全（予定） |
| 認証 | Supabase Auth | - | OAuth, メール等（予定） |
| バリデーション | Zod | - | フロントと共通（予定） |
| デプロイ | Cloudflare Workers | - | Edge |

## 開発ツール

| カテゴリ | 技術 | 備考 |
|----------|------|------|
| パッケージマネージャー | Bun | 1.1.40 - 高速・TypeScript対応 |
| モノレポ管理 | Turborepo | 2.6.3 - ビルドキャッシュ |
| テスト | Vitest | 高速 |
| Linter | ESLint | 9.x |
| Formatter | - | （未設定） |

## 主要な依存関係（Web）

- **UIコンポーネント**: @radix-ui/react-*（checkbox, dialog, select, separator, slot）
- **スタイリング**: clsx, tailwind-merge, class-variance-authority
- **アイコン**: lucide-react
- **Markdown**: react-markdown, remark-gfm, gray-matter
- **コンパイラー最適化**: babel-plugin-react-compiler
