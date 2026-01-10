# hashibiroko プロジェクト概要

## ⚠️ 重要: Constitution（開発原則）

**すべての開発作業は `.specify/memory/constitution.md` に定義された原則に従う必要があります。**

主要原則:
- **Test-Driven Development (NON-NEGOTIABLE)**: テストを先に書く
- **AI-First Development**: 機械可読なドキュメント構造
- **Simplicity**: YAGNI原則の遵守

詳細: `.specify/memory/constitution.md` を参照

## プロジェクトの目的

hashibiroko は **Web + モバイル** 向けのアプリケーションです。
フロントエンド（Web）とバックエンド（API）は分離されており、APIはモバイルアプリと共通で使用します。

現在、ポケモンスリープ関連のWebサイトを構築中です。

## システム構成

```
┌─────────────────┐     ┌─────────────────┐
│   Web (Next.js) │     │      Mobile     │
│     Vercel      │     │                 │
└────────┬────────┘     └────────┬────────┘
         │                       │
         └───────────┬───────────┘
                     │
                     ▼
         ┌───────────────────────┐
         │   API (Hono)          │
         │  Cloudflare Workers   │
         └───────────┬───────────┘
                     │
                     ▼
         ┌───────────────────────┐
         │   Database            │
         │   Supabase (PostgreSQL)│
         └───────────────────────┘
```

## 環境情報

- **システム**: Darwin (macOS)
- **パッケージマネージャー**: Bun 1.1.40
- **モノレポ管理**: Turborepo 2.6.3

## 開発環境

| 環境 | Web | API | 用途 |
|------|-----|-----|------|
| Development | localhost:3030 | localhost:8787 | ローカル開発 |
| Staging | TBD | TBD | テスト環境 |
| Production | Vercel | Cloudflare Workers | 本番 |
