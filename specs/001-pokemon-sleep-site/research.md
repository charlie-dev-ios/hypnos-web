# Research: ポケモンスリープ攻略サイト技術選定

**Date**: 2026-01-02
**Feature**: ポケモンスリープ攻略サイト

## 目的

ポケモンスリープ攻略サイトの実装に必要な技術スタック、ベストプラクティス、アーキテクチャパターンを調査し、Technical Contextで特定された技術選定の根拠を文書化します。

## 調査項目と決定事項

### 1. フレームワーク選定: Next.js 15 (App Router)

**Decision**: Next.js 15 をApp Routerモードで使用

**Rationale**:
- **静的サイト生成（SSG）対応**: ポケモンデータは静的コンテンツであり、ビルド時に全ページを生成可能。これにより高速なページ読み込みを実現
- **ファイルベースルーティング**: 直感的なディレクトリ構造でページを管理可能
- **React Server Components**: サーバー側でデータ取得を行い、クライアント側のJavaScriptバンドルサイズを削減
- **画像最適化**: `next/image`による自動的な画像最適化でパフォーマンス向上
- **SEO対応**: メタデータAPI、サイトマップ生成など、攻略サイトに必須のSEO機能が充実
- **Bun互換性**: Next.js 15はBunランタイムと互換性があり、Constitution要件を満たす

**Alternatives Considered**:
- **Astro**: 静的サイトに最適だが、Reactエコシステム（shadcn/ui）との統合が弱い
- **Remix**: 優れたフレームワークだが、静的生成よりもSSR重視で本用途には過剰
- **Vite + React**: 軽量だが、ルーティング、画像最適化、SEOを自前実装する必要がある

---

### 2. UIコンポーネント: shadcn/ui

**Decision**: shadcn/ui をUIコンポーネントライブラリとして採用

**Rationale**:
- **コピー&ペースト型**: npm依存ではなくコードをプロジェクトに直接配置。カスタマイズ性が高く、バンドルサイズを最小化
- **アクセシビリティ**: Radix UIベースで、ARIA属性が適切に実装済み
- **Tailwind CSS統合**: プロジェクトで使用予定のTailwind CSSとシームレスに統合
- **TypeScript完全対応**: 型安全性を確保
- **豊富なコンポーネント**: Card, Button, Input, Sheet（モバイルメニュー）など、必要なコンポーネントが揃っている
- **開発速度**: 事前構築されたコンポーネントで開発時間を短縮し、Constitution原則「Simplicity」に準拠

**Alternatives Considered**:
- **Material UI**: 重厚で、バンドルサイズが大きい。ポケモンゲーム風のカジュアルなデザインに不向き
- **Chakra UI**: 優れたライブラリだが、shadcn/uiと比較してカスタマイズ性が低い
- **完全カスタム実装**: 開発時間が長く、アクセシビリティの実装漏れリスクが高い

---

### 3. スタイリング: Tailwind CSS

**Decision**: Tailwind CSS をスタイリングフレームワークとして使用

**Rationale**:
- **ユーティリティファースト**: レスポンシブデザイン（モバイル320px〜デスクトップ）の実装が容易
- **PurgeCSS統合**: 未使用のCSSを自動削除し、バンドルサイズを最小化
- **デザイントークン**: カラースキーム、スペーシングを一元管理可能
- **shadcn/ui要件**: shadcn/uiがTailwind CSSを前提としている
- **開発体験**: クラス名でスタイルを直接記述でき、CSSファイルとコンポーネントを行き来する必要がない

**Alternatives Considered**:
- **CSS Modules**: スコープ化されたCSSだが、レスポンシブデザインの記述が冗長
- **Styled Components**: ランタイムオーバーヘッドがあり、SSG/SSRでのパフォーマンスが劣る
- **vanilla CSS**: 大規模プロジェクトでの保守性が低い

---

### 4. データ管理: ファイルベース（JSON + Markdown）

**Decision**: コンテンツをJSON（構造化データ）とMarkdown（テキストコンテンツ）で管理

**Rationale**:
- **シンプルさ**: データベース不要で、Constitution原則「Simplicity」「YAGNI」に準拠
- **手動更新容易**: 仕様書で「手動更新」が要件。ファイル編集だけで完結
- **バージョン管理**: Gitで変更履歴を追跡可能
- **ビルド時読み込み**: Next.jsのSSGでビルド時にファイルを読み込み、ランタイムでのI/O不要
- **型安全性**: Zodスキーマでバリデーション、TypeScript型を自動生成

**ファイル構造例**:
```json
// content/pokemon/pokemon.json
{
  "pokemon": [
    {
      "id": 1,
      "name": "ピカチュウ",
      "sleepType": "すやすや",
      "specialty": "スキル",
      "berry": "オレンのみ",
      "skill": "でんきタイプのちから",
      "evolutions": [25, 26]
    }
  ]
}
```

```markdown
<!-- content/mechanics/sleep-types.md -->
# 睡眠タイプについて

ポケモンスリープには3つの睡眠タイプがあります...
```

**Alternatives Considered**:
- **Headless CMS（Contentful, Strapi）**: 小規模サイトには過剰。手動更新のメリットを損なう
- **データベース（PostgreSQL, MongoDB）**: インフラ管理が必要で、静的サイトのメリットを失う
- **Google Sheets API**: リアルタイム性不要で、API呼び出しがパフォーマンスボトルネックになる

---

### 5. バリデーション: Zod

**Decision**: Zod をスキーマバリデーションライブラリとして採用

**Rationale**:
- **TypeScript統合**: スキーマからTypeScript型を自動生成（`z.infer<typeof schema>`）
- **ランタイムバリデーション**: JSONファイルの読み込み時にデータ整合性を検証
- **エラーメッセージ**: 詳細なバリデーションエラーメッセージで、データの問題を早期発見
- **Constitution準拠**: 「Zodスキーマを共有」が明記されている

**使用例**:
```typescript
import { z } from 'zod';

export const PokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  sleepType: z.enum(['うとうと', 'すやすや', 'ぐっすり']),
  specialty: z.enum(['きのみ', '食材', 'スキル']),
  berry: z.string(),
  skill: z.string(),
  evolutions: z.array(z.number()).optional(),
});

export type Pokemon = z.infer<typeof PokemonSchema>;
```

**Alternatives Considered**:
- **Yup**: 機能的には類似だが、TypeScript統合がZodより劣る
- **io-ts**: 関数型プログラミング寄りで学習コストが高い
- **手動バリデーション**: エラーが多く、型安全性を損なう

---

### 6. テスティング: Vitest + React Testing Library

**Decision**: Vitest（テストランナー）+ React Testing Library（コンポーネントテスト）

**Rationale**:
- **Vite互換**: Next.jsはViteベースではないが、Vitestは高速でTypeScript/JSX対応が優れている
- **Jest互換API**: Jestからの移行が容易で、学習コストが低い
- **Bun互換性**: VitestはBunランタイムで動作可能
- **React Testing Library**: ユーザー視点でコンポーネントをテスト。アクセシビリティ確保にも貢献
- **TDD対応**: Constitution要件「Test-Driven Development」を実現

**テスト戦略**:
```typescript
// tests/unit/lib/search.test.ts
import { describe, it, expect } from 'vitest';
import { filterPokemon } from '@/lib/data/search';

describe('filterPokemon', () => {
  it('睡眠タイプでフィルタリングできる', () => {
    const result = filterPokemon(mockPokemon, { sleepType: 'すやすや' });
    expect(result.every(p => p.sleepType === 'すやすや')).toBe(true);
  });
});
```

**Alternatives Considered**:
- **Jest**: 設定が複雑で、Vitestより遅い
- **Playwright（E2Eのみ）**: E2Eは重要だが、ユニットテストには不向き
- **Testing Library単体**: テストランナーが別途必要

---

### 7. パッケージマネージャー: Bun

**Decision**: Bun をランタイムおよびパッケージマネージャーとして使用

**Rationale**:
- **Constitution要件**: 「Bunをパッケージマネージャーおよび開発ランタイムとして統一」が明記
- **高速**: npm/yarn/pnpmより圧倒的に高速なインストール・実行
- **TypeScript対応**: トランスパイル不要で直接実行可能
- **Next.js 15互換**: 公式にBunサポートが追加されている

**使用コマンド**:
```bash
bun install                  # 依存関係インストール
bun run dev                  # 開発サーバー起動
bun run build                # プロダクションビルド
bun test                     # テスト実行（Vitest）
```

**Alternatives Considered**:
- **npm/yarn/pnpm**: Constitution違反となるため却下

---

### 8. 検索・フィルター・ソート実装

**Decision**: クライアントサイドでの配列操作（静的データ前提）

**Rationale**:
- **データ規模**: ポケモン数100-200体程度であれば、全データをクライアントでフィルタリング可能
- **パフォーマンス**: 静的データをビルド時に埋め込み、ブラウザメモリ内で高速処理
- **シンプルさ**: サーバーサイド検索API不要

**実装例**:
```typescript
// lib/data/search.ts
export function searchPokemon(
  pokemon: Pokemon[],
  query: string,
  filters: { sleepType?: string; specialty?: string },
  sortBy: 'name' | 'berry'
): Pokemon[] {
  let result = pokemon;

  // キーワード検索
  if (query) {
    result = result.filter(p =>
      p.name.includes(query) ||
      p.skill.includes(query) ||
      p.berry.includes(query)
    );
  }

  // フィルター
  if (filters.sleepType) {
    result = result.filter(p => p.sleepType === filters.sleepType);
  }
  if (filters.specialty) {
    result = result.filter(p => p.specialty === filters.specialty);
  }

  // ソート
  result.sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name, 'ja');
    // その他のソート条件...
  });

  return result;
}
```

**Alternatives Considered**:
- **Fuse.js（あいまい検索）**: 仕様に「あいまい検索」が含まれていないため不要
- **Algolia/MeiliSearch**: 外部検索サービスは小規模サイトには過剰

---

### 9. レスポンシブデザイン戦略

**Decision**: モバイルファースト + Tailwind ブレークポイント

**Rationale**:
- **仕様要件**: 320px〜768px対応が必須
- **モバイルファースト**: デフォルトでモバイルスタイル、`md:`/`lg:`でデスクトップ拡張
- **Tailwind ブレークポイント**:
  - デフォルト: 〜639px（モバイル）
  - `sm:` 640px〜（大きめのスマホ）
  - `md:` 768px〜（タブレット）
  - `lg:` 1024px〜（デスクトップ）

**実装例**:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* モバイル: 1列、タブレット: 2列、デスクトップ: 3列 */}
</div>

{/* モバイルメニュー: ハンバーガー */}
<Sheet> {/* shadcn/ui Sheet コンポーネント */}
  <SheetTrigger className="md:hidden">☰</SheetTrigger>
  <SheetContent>...</SheetContent>
</Sheet>

{/* デスクトップナビ: カード */}
<div className="hidden md:grid md:grid-cols-3 gap-6">
  {/* カードナビゲーション */}
</div>
```

**Alternatives Considered**:
- **完全独立のモバイル/デスクトップページ**: 保守コストが2倍になる
- **ブレークポイントなしの流動レイアウト**: 複雑なデザイン要件に対応困難

---

### 10. パフォーマンス最適化

**Decision**: Next.js SSG + 画像最適化 + コード分割

**Rationale**:
- **静的サイト生成（SSG）**: `generateStaticParams`で全ポケモンページをビルド時に生成
- **画像最適化**: `next/image`で自動的にWebP変換、遅延読み込み
- **コード分割**: 動的インポート（`dynamic()`）でページごとにバンドルを分割
- **目標達成**: ページ読み込み < 3秒、Lighthouse > 90

**実装例**:
```typescript
// app/pokemon/[id]/page.tsx
export async function generateStaticParams() {
  const pokemon = await getAllPokemon();
  return pokemon.map(p => ({ id: p.id.toString() }));
}

// 画像最適化
import Image from 'next/image';
<Image
  src="/images/pokemon/pikachu.png"
  width={200}
  height={200}
  alt="ピカチュウ"
  loading="lazy"
/>
```

**Alternatives Considered**:
- **クライアントサイドレンダリング（CSR）**: 初期読み込みが遅く、SEOに不利
- **サーバーサイドレンダリング（SSR）**: 静的コンテンツにはオーバースペック

---

## ベストプラクティス

### Next.js App Router
- **Server Components優先**: データ取得はServer Componentで行い、Client Componentは最小限に
- **メタデータAPI**: `metadata`エクスポートでSEO最適化
- **動的ルート**: `[id]`パラメータで個別ポケモンページを生成

### shadcn/ui
- **コンポーネントの選択的インストール**: 必要なコンポーネントのみ`npx shadcn-ui@latest add card button`でインストール
- **カスタマイズ**: `components/ui/`のコードを直接編集してプロジェクト固有のデザインに調整

### TDD実践
- **Red-Green-Refactor**: テスト→実装→リファクタリングの順守
- **テストカバレッジ**: 検索・フィルター・ソートなどのビジネスロジックを優先的にカバー

---

## リスクと対策

### リスク1: Bunの安定性
- **リスク**: Bunは比較的新しく、エコシステムが完全には成熟していない可能性
- **対策**: Next.js公式のBunサポートを確認済み。問題発生時はnpmへのフォールバック可能

### リスク2: コンテンツファイルの肥大化
- **リスク**: ポケモン数が増えるとJSONファイルが巨大化
- **対策**: 200体程度では問題なし。将来的にはファイル分割（pokemon-001-050.json）で対応可能

### リスク3: 検索パフォーマンス
- **リスク**: ブラウザ内検索が遅延する可能性
- **対策**: useMemoでフィルター結果をキャッシュ。1000体を超える場合は再検討

---

## まとめ

技術スタック全体がConstitution要件を満たし、仕様書の機能要件（FR-001〜FR-014）を実現可能です。shadcn/ui使用により開発速度を向上させつつ、TDD、Simplicity、AI-First原則に準拠した設計となっています。

**次のフェーズ**: Phase 1（Design & Contracts）でデータモデルとAPIコントラクトを具体化します。
