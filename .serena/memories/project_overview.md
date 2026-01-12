# Hashibiroko - プロジェクト概要

## プロジェクトの目的
Pokemon Sleep攻略情報サイト（Web + モバイル）

## プロジェクトの性質
- モノレポ構成（Turborepo管理）
- フロントエンド・バックエンド分離アーキテクチャ
- Edge-First戦略（Vercel、Cloudflare Workers）
- AI-First開発（明確な仕様管理、機械可読なドキュメント）

## 主要機能
- ポケモン一覧・詳細ページ
- 料理レシピ管理
- 攻略戦略情報
- 島情報
- ゲームメカニクス解説
- チーム編成機能

## プロジェクト構成
- `apps/web` - Next.js Webフロントエンド（実装中）
- `apps/api` - Hono APIバックエンド（開発中）
- `packages/shared` - 共通パッケージ（型定義・スキーマ、今後作成予定）
- `specs/` - 機能仕様書（speckit管理）
- `.specify/` - speckit設定、開発原則（constitution.md）
- `.serena/` - Serena設定・メモリファイル
- `.claude/` - Claude Code設定・カスタムコマンド

## 開発環境
- Web: http://localhost:3030 (ポート3030)
- API: http://localhost:8787 (ポート8787、予定)

## デプロイ環境
- Web: Vercel
- API: Cloudflare Workers
