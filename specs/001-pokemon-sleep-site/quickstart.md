# Quickstart: ポケモンスリープ攻略サイト開発環境セットアップ

**Date**: 2026-01-02
**Feature**: ポケモンスリープ攻略サイト

## 概要

このガイドでは、ポケモンスリープ攻略サイトの開発環境をセットアップし、ローカル開発を開始する手順を説明します。Constitution原則に従い、Bun、Next.js 15、shadcn/uiを使用した開発環境を構築します。

**所要時間**: 約15分

---

## 前提条件

### 必須
- **Bun**: v1.0以上（パッケージマネージャー・ランタイム）
- **Git**: バージョン管理
- **エディタ**: VS Code推奨（TypeScript、ESLint、Tailwind CSS拡張機能あり）

### Bunのインストール

#### macOS/Linux
```bash
curl -fsSL https://bun.sh/install | bash
```

#### Windows
```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

#### バージョン確認
```bash
bun --version  # v1.0.0以上であることを確認
```

---

## プロジェクトセットアップ

### 1. Next.jsプロジェクトの作成

```bash
# プロジェクトディレクトリを作成
bunx create-next-app@latest pokemon-sleep-site \
  --typescript \
  --tailwind \
  --app \
  --src-dir=false \
  --import-alias="@/*"

cd pokemon-sleep-site
```

**選択肢の説明**:
- `--typescript`: TypeScriptを使用
- `--tailwind`: Tailwind CSSをセットアップ
- `--app`: App Routerを使用（Pages Routerではない）
- `--src-dir=false`: `src/`ディレクトリを使用しない
- `--import-alias="@/*"`: `@/`でルートからのインポート

---

### 2. shadcn/uiのセットアップ

```bash
# shadcn/ui CLIの初期化
bunx shadcn@latest init

# プロンプトに対して以下を選択:
# - Would you like to use TypeScript? → Yes
# - Which style would you like to use? → Default
# - Which color would you like to use? → Neutral（ポケモンテーマに合わせて変更可能）
# - Where is your global CSS file? → app/globals.css
# - Do you want to use CSS variables? → Yes
# - Where is your tailwind.config? → tailwind.config.ts
# - Configure import alias? → @/components
```

**基本コンポーネントのインストール**:
```bash
# ナビゲーション・UI用の基本コンポーネント
bunx shadcn@latest add card button input sheet

# 検索・フィルター用
bunx shadcn@latest add select checkbox

# その他
bunx shadcn@latest add separator skeleton
```

---

### 3. プロジェクト構造のセットアップ

```bash
# ディレクトリ作成
mkdir -p lib/{data,schemas} content/{pokemon,berries,skills,recipes,islands,mechanics,strategies,teams} tests/{unit,integration} public/images/{pokemon,icons,berries}

# データスキーマファイルの作成（テンプレート）
touch lib/schemas/pokemon.ts
touch lib/schemas/berry.ts
touch lib/schemas/skill.ts
touch lib/schemas/recipe.ts
touch lib/schemas/island.ts
touch lib/schemas/content.ts

# データアクセスレイヤーの作成
touch lib/data/pokemon.ts
touch lib/data/berry.ts
touch lib/data/search.ts
touch lib/data/content.ts
```

---

### 4. 依存関係のインストール

```bash
# Zod（バリデーション）
bun add zod

# Vitest（テスト）
bun add -d vitest @testing-library/react @testing-library/jest-dom jsdom

# React Markdown（コンテンツ表示）
bun add react-markdown remark-gfm
```

---

### 5. 設定ファイルの作成

#### Vitest設定（`vitest.config.ts`）

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
```

#### テストセットアップ（`tests/setup.ts`）

```typescript
import '@testing-library/jest-dom';
```

#### Next.js設定（`next.config.js`）

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp'],
  },
  // Bunランタイム対応
  experimental: {
    serverComponentsExternalPackages: ['zod'],
  },
};

module.exports = nextConfig;
```

---

### 6. サンプルデータの作成

#### Pokemon JSONサンプル（`content/pokemon/pokemon.json`）

```json
{
  "pokemon": [
    {
      "id": 25,
      "name": "ピカチュウ",
      "nameKana": "ぴかちゅう",
      "sleepType": "すやすや",
      "specialty": "スキル",
      "berry": {
        "type": "オレンのみ",
        "baseYield": 5
      },
      "skill": {
        "name": "エナジーチャージS",
        "description": "最大エネルギー量の3%のエネルギーを獲得する",
        "maxLevel": 7
      },
      "evolution": {
        "prevId": 172,
        "nextIds": [26],
        "condition": "レベル20"
      },
      "islands": ["ワカクサ本島", "シアンの砂浜"],
      "imageUrl": "/images/pokemon/pikachu.png",
      "iconUrl": "/images/icons/pikachu.png"
    }
  ]
}
```

#### Markdown コンテンツサンプル（`content/mechanics/sleep-types.md`）

```markdown
---
slug: "sleep-types-guide"
title: "睡眠タイプの仕組みと活用法"
category: "mechanics"
description: "うとうと、すやすや、ぐっすりの3つの睡眠タイプについて詳しく解説"
publishedAt: "2026-01-01T00:00:00Z"
tags: ["初心者向け", "睡眠タイプ"]
---

# 睡眠タイプの仕組みと活用法

ポケモンスリープには**うとうと**、**すやすや**、**ぐっすり**の3つの睡眠タイプがあります。

## うとうと
浅い睡眠タイプ。寝始めや起きる直前に多い。

## すやすや
標準的な睡眠タイプ。バランスの取れた睡眠で出現。

## ぐっすり
深い睡眠タイプ。長時間熟睡すると出現しやすい。
```

---

### 7. データスキーマの実装

#### `lib/schemas/pokemon.ts`

```typescript
import { z } from 'zod';

export const SleepTypeSchema = z.enum(['うとうと', 'すやすや', 'ぐっすり']);
export const SpecialtySchema = z.enum(['きのみ', '食材', 'スキル']);

export const PokemonSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  nameKana: z.string().min(1).optional(),
  sleepType: SleepTypeSchema,
  specialty: SpecialtySchema,
  berry: z.object({
    type: z.string(),
    baseYield: z.number().positive(),
  }),
  skill: z.object({
    name: z.string(),
    description: z.string(),
    maxLevel: z.number().int().positive().default(7),
  }),
  evolution: z.object({
    prevId: z.number().int().positive().optional(),
    nextIds: z.array(z.number().int().positive()).optional(),
    condition: z.string().optional(),
  }).optional(),
  islands: z.array(z.string()),
  imageUrl: z.string().url().optional(),
  iconUrl: z.string().url().optional(),
});

export type Pokemon = z.infer<typeof PokemonSchema>;
export type SleepType = z.infer<typeof SleepTypeSchema>;
export type Specialty = z.infer<typeof SpecialtySchema>;
```

---

### 8. データアクセス実装

#### `lib/data/pokemon.ts`

```typescript
import fs from 'fs/promises';
import path from 'path';
import { PokemonSchema, type Pokemon } from '@/lib/schemas/pokemon';
import { z } from 'zod';

const POKEMON_FILE = path.join(process.cwd(), 'content/pokemon/pokemon.json');

export async function getAllPokemon(): Promise<Pokemon[]> {
  const data = await fs.readFile(POKEMON_FILE, 'utf-8');
  const parsed = JSON.parse(data);

  const result = z.array(PokemonSchema).safeParse(parsed.pokemon);

  if (!result.success) {
    throw new Error(`Pokemon data validation failed: ${result.error.message}`);
  }

  return result.data;
}

export async function getPokemonById(id: number): Promise<Pokemon> {
  const allPokemon = await getAllPokemon();
  const pokemon = allPokemon.find(p => p.id === id);

  if (!pokemon) {
    throw new Error(`Pokemon with id ${id} not found`);
  }

  return pokemon;
}
```

---

### 9. 簡単なページの作成

#### `app/page.tsx`（トップページ）

```typescript
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function Home() {
  const sections = [
    { title: 'ポケモン図鑑', href: '/pokemon', description: 'すべてのポケモンを検索' },
    { title: 'ゲームメカニクス', href: '/mechanics', description: '睡眠タイプや仕組みを学ぶ' },
    { title: '睡眠戦略', href: '/strategies', description: '効率的な睡眠方法' },
    { title: 'チーム編成', href: '/teams', description: '最適なチームを構築' },
    { title: '料理レシピ', href: '/recipes', description: '料理の作り方' },
    { title: '島ガイド', href: '/islands', description: '各島の攻略情報' },
  ];

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">ポケモンスリープ攻略サイト</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Link key={section.href} href={section.href}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
```

---

### 10. 開発サーバーの起動

```bash
# 開発サーバー起動
bun run dev

# ブラウザで http://localhost:3000 を開く
```

---

## テスト実行

### ユニットテストの作成と実行

#### `tests/unit/lib/data/pokemon.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import { getAllPokemon, getPokemonById } from '@/lib/data/pokemon';

describe('Pokemon Data API', () => {
  it('should return all pokemon', async () => {
    const pokemon = await getAllPokemon();
    expect(pokemon).toBeInstanceOf(Array);
    expect(pokemon.length).toBeGreaterThan(0);
  });

  it('should get pokemon by id', async () => {
    const pikachu = await getPokemonById(25);
    expect(pikachu.name).toBe('ピカチュウ');
  });

  it('should throw error for invalid id', async () => {
    await expect(getPokemonById(9999)).rejects.toThrow();
  });
});
```

#### テスト実行

```bash
# 全テスト実行
bun test

# ウォッチモード
bun test --watch

# カバレッジ
bun test --coverage
```

---

## ビルドとデプロイ

### 本番ビルド

```bash
# 静的サイト生成
bun run build

# ビルド結果の確認
bun run start  # 本番モードでサーバー起動
```

### 出力ファイル

```
.next/
├── static/         # 静的アセット
└── server/         # サーバーサイドコード

out/  # 完全静的エクスポートの場合（next.config.jsで設定）
```

---

## 開発ワークフロー（TDD）

### Red-Green-Refactorサイクル

#### 1. Red: テストを書く（失敗）

```typescript
// tests/unit/lib/data/search.test.ts
it('should filter pokemon by sleep type', () => {
  const result = filterPokemonBySleepType(mockPokemon, 'すやすや');
  expect(result.every(p => p.sleepType === 'すやすや')).toBe(true);
});
```

```bash
bun test  # テスト失敗を確認
```

#### 2. Green: 実装する（成功）

```typescript
// lib/data/search.ts
export function filterPokemonBySleepType(
  pokemon: Pokemon[],
  sleepType: SleepType
): Pokemon[] {
  return pokemon.filter(p => p.sleepType === sleepType);
}
```

```bash
bun test  # テスト成功を確認
```

#### 3. Refactor: リファクタリング

```typescript
// より汎用的な検索関数に統合
export function searchPokemon(pokemon: Pokemon[], options: SearchOptions): Pokemon[] {
  let result = pokemon;

  if (options.sleepType) {
    result = result.filter(p => p.sleepType === options.sleepType);
  }

  return result;
}
```

```bash
bun test  # テストが引き続き成功することを確認
```

---

## トラブルシューティング

### Bunのインストールエラー

```bash
# キャッシュクリア
bun pm cache rm

# 再インストール
bun install
```

### Next.jsのビルドエラー

```bash
# .next ディレクトリを削除
rm -rf .next

# 再ビルド
bun run build
```

### shadcn/uiコンポーネントが見つからない

```bash
# components.json が正しく生成されているか確認
cat components.json

# コンポーネントを再インストール
bunx shadcn@latest add card
```

---

## 次のステップ

1. **コンテンツの追加**: `content/`ディレクトリにポケモンデータ、レシピ、ガイド記事を追加
2. **ページの実装**: `/pokemon`, `/mechanics`, `/recipes` などのページを作成
3. **検索機能の実装**: `lib/data/search.ts`で検索・フィルター・ソート機能を実装
4. **テストの拡充**: TDDサイクルに従ってテストカバレッジを向上
5. **デザインの調整**: Tailwind CSSでデザインをカスタマイズ

---

## 参考リンク

- [Next.js 15 ドキュメント](https://nextjs.org/docs)
- [shadcn/ui ドキュメント](https://ui.shadcn.com/docs)
- [Zod ドキュメント](https://zod.dev/)
- [Vitest ドキュメント](https://vitest.dev/)
- [Bun ドキュメント](https://bun.sh/docs)

---

## まとめ

これで、ポケモンスリープ攻略サイトの開発環境が完全にセットアップされました。Constitution原則（TDD、Simplicity、AI-First）に従い、Bun、Next.js、shadcn/uiを使用した開発を開始できます。

**次のフェーズ**: `/speckit.tasks` コマンドでタスクリストを生成し、実装を進めます。
