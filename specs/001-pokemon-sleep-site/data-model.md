# Data Model: ポケモンスリープ攻略サイト

**Date**: 2026-01-02
**Feature**: ポケモンスリープ攻略サイト

## 概要

このドキュメントでは、ポケモンスリープ攻略サイトで管理するデータエンティティとそのスキーマを定義します。すべてのデータはファイルベース（JSON/Markdown）で管理され、Zodスキーマによってバリデーションされます。

---

## エンティティ一覧

1. **Pokemon（ポケモン）** - ポケモンの基本情報
2. **Berry（きのみ）** - ポケモンが収集するきのみ
3. **Skill（メインスキル）** - ポケモンの特殊能力
4. **Recipe（料理）** - クッキングレシピ
5. **Island（島）** - 睡眠リサーチの場所
6. **Evolution（進化）** - ポケモンの進化関係
7. **Content（コンテンツ）** - ガイド・戦略記事（Markdown）

---

## 1. Pokemon（ポケモン）

### 説明
ポケモンスリープに登場する個別のポケモン種。睡眠タイプ、とくい、きのみ、メインスキルなどの属性を持つ。

### スキーマ

```typescript
import { z } from 'zod';

export const SleepTypeSchema = z.enum(['うとうと', 'すやすや', 'ぐっすり']);
export const SpecialtySchema = z.enum(['きのみ', '食材', 'スキル']);

export const PokemonSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  nameKana: z.string().min(1).optional(), // 検索用ひらがな
  sleepType: SleepTypeSchema,
  specialty: SpecialtySchema,

  // きのみ情報
  berry: z.object({
    type: z.string(), // きのみの種類（例: "オレンのみ"）
    baseYield: z.number().positive(), // 基本収集数
  }),

  // メインスキル
  skill: z.object({
    name: z.string(),
    description: z.string(),
    maxLevel: z.number().int().positive().default(7),
  }),

  // 進化情報
  evolution: z.object({
    prevId: z.number().int().positive().optional(), // 進化前のポケモンID
    nextIds: z.array(z.number().int().positive()).optional(), // 進化先のポケモンID（複数可能）
    condition: z.string().optional(), // 進化条件（例: "Lv.20"、"おやつ80個"）
  }).optional(),

  // 出現場所
  islands: z.array(z.string()), // 出現する島の名前

  // 画像
  imageUrl: z.string().url().optional(),
  iconUrl: z.string().url().optional(),
});

export type Pokemon = z.infer<typeof PokemonSchema>;
export type SleepType = z.infer<typeof SleepTypeSchema>;
export type Specialty = z.infer<typeof SpecialtySchema>;
```

### サンプルデータ

```json
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
```

### バリデーションルール
- `id`: 正の整数、ユニーク
- `name`: 1文字以上の文字列
- `sleepType`: 定義された列挙値のみ
- `specialty`: 定義された列挙値のみ
- `berry.baseYield`: 正の数値
- `evolution.nextIds`: 配列（進化先が複数の場合もあるため）

---

## 2. Berry（きのみ）

### 説明
ポケモンが収集するきのみの種類。効果やエネルギー値を含む。

### スキーマ

```typescript
export const BerrySchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1), // 例: "オレンのみ"
  energy: z.number().positive(), // エネルギー値
  description: z.string().optional(), // 説明文
  imageUrl: z.string().url().optional(),
});

export type Berry = z.infer<typeof BerrySchema>;
```

### サンプルデータ

```json
{
  "id": 1,
  "name": "オレンのみ",
  "energy": 31,
  "description": "もっとも基本的なきのみ。多くのポケモンが集める。",
  "imageUrl": "/images/berries/oran.png"
}
```

---

## 3. Skill（メインスキル）

### 説明
ポケモンが使用できるメインスキル。複数のポケモンが同じスキルを持つ場合がある。

### スキーマ

```typescript
export const SkillSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  description: z.string(),
  effects: z.array(z.object({
    level: z.number().int().min(1).max(7),
    value: z.string(), // 例: "エネルギー量の3%"、"120"
  })),
  iconUrl: z.string().url().optional(),
});

export type Skill = z.infer<typeof SkillSchema>;
```

### サンプルデータ

```json
{
  "id": 1,
  "name": "エナジーチャージS",
  "description": "最大エネルギー量の一定割合のエネルギーを獲得する",
  "effects": [
    { "level": 1, "value": "3%" },
    { "level": 2, "value": "4%" },
    { "level": 3, "value": "6%" },
    { "level": 4, "value": "8%" },
    { "level": 5, "value": "11%" },
    { "level": 6, "value": "15%" },
    { "level": 7, "value": "20%" }
  ],
  "iconUrl": "/images/skills/energy-charge-s.png"
}
```

---

## 4. Recipe（料理）

### 説明
クッキングレシピ。必要な食材と効果を定義。

### スキーマ

```typescript
export const RecipeSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1), // 例: "とくせんリンゴジュース"
  type: z.enum(['カレー', 'サラダ', 'デザート', 'ドリンク']),
  power: z.number().positive(), // 料理パワー
  ingredients: z.array(z.object({
    name: z.string(),
    quantity: z.number().int().positive(),
  })),
  effect: z.string(), // 効果説明
  imageUrl: z.string().url().optional(),
});

export type Recipe = z.infer<typeof RecipeSchema>;
```

### サンプルデータ

```json
{
  "id": 1,
  "name": "とくせんリンゴジュース",
  "type": "ドリンク",
  "power": 85,
  "ingredients": [
    { "name": "あまいミツ", "quantity": 7 }
  ],
  "effect": "おてつだい時間短縮",
  "imageUrl": "/images/recipes/apple-juice.png"
}
```

---

## 5. Island（島）

### 説明
睡眠リサーチを行う場所。出現するポケモンや特徴を持つ。

### スキーマ

```typescript
export const IslandSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1), // 例: "ワカクサ本島"
  description: z.string(),
  availablePokemon: z.array(z.number().int().positive()), // ポケモンIDの配列
  imageUrl: z.string().url().optional(),
});

export type Island = z.infer<typeof IslandSchema>;
```

### サンプルデータ

```json
{
  "id": 1,
  "name": "ワカクサ本島",
  "description": "最初に訪れる島。バランスの取れたポケモンが出現する。",
  "availablePokemon": [25, 133, 172, 194],
  "imageUrl": "/images/islands/wakakusa.png"
}
```

---

## 6. Evolution（進化）

### 説明
ポケモンの進化系統を管理するリレーションシップ。Pokemonエンティティに埋め込まれているが、進化チェーン全体を可視化する際に使用。

### 関連
- `Pokemon.evolution.prevId`: 進化前のポケモンID
- `Pokemon.evolution.nextIds`: 進化先のポケモンID配列
- 進化チェーン例: ピチュー(172) → ピカチュウ(25) → ライチュウ(26)

---

## 7. Content（コンテンツ）

### 説明
ガイド記事や戦略情報。MarkdownファイルとしてJSONメタデータ（フロントマター）を含む。

### スキーマ

```typescript
export const ContentSchema = z.object({
  slug: z.string().min(1), // URL用スラッグ（例: "sleep-types-guide"）
  title: z.string().min(1),
  category: z.enum(['mechanics', 'strategies', 'teams', 'guides']),
  description: z.string().optional(),
  publishedAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  tags: z.array(z.string()).optional(),
  content: z.string(), // Markdown本文
});

export type Content = z.infer<typeof ContentSchema>;
```

### サンプルデータ（Markdownファイル）

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

ポケモンスリープには**うとうと**、**すやすや**、**ぐっすり**の3つの睡眠タイプがあります...
```

---

## データ関係

### ER図（簡略版）

```
Pokemon ─────┬─────── Berry (many-to-one: pokemon.berry.type → berry.name)
             │
             ├─────── Skill (many-to-one: pokemon.skill.name → skill.name)
             │
             ├─────── Island (many-to-many: pokemon.islands ↔ island.availablePokemon)
             │
             └─────── Pokemon (self-referential: pokemon.evolution.prevId/nextIds)

Recipe ──────────── Ingredient (embedded in recipe.ingredients)

Content (standalone, no foreign keys)
```

### リレーションシップ

1. **Pokemon ↔ Berry**: 多対一（複数のポケモンが同じきのみを収集可能）
2. **Pokemon ↔ Skill**: 多対一（複数のポケモンが同じスキルを持つ可能性）
3. **Pokemon ↔ Island**: 多対多（ポケモンは複数の島に出現、島には複数のポケモンが出現）
4. **Pokemon ↔ Pokemon**: 自己参照（進化チェーン）

---

## ファイル配置

```
content/
├── pokemon/
│   ├── pokemon.json          # 全ポケモンデータ
│   └── evolutions.json       # 進化チェーン（オプション）
├── berries/
│   └── berries.json          # 全きのみデータ
├── skills/
│   └── skills.json           # 全スキルデータ
├── recipes/
│   └── recipes.json          # 全料理データ
├── islands/
│   └── islands.json          # 全島データ
├── mechanics/
│   ├── sleep-types.md        # 睡眠タイプガイド
│   └── drowsy-power.md       # げんきの仕組み
├── strategies/
│   ├── berry-optimization.md # きのみ最適化
│   └── team-building.md      # チーム編成
└── teams/
    └── beginner-teams.md     # 初心者向けチーム
```

---

## バリデーション戦略

### ビルド時バリデーション

```typescript
// lib/data/validation.ts
import { PokemonSchema } from '@/lib/schemas/pokemon';
import pokemonData from '@/content/pokemon/pokemon.json';

export function validateAllPokemon() {
  const result = z.array(PokemonSchema).safeParse(pokemonData.pokemon);

  if (!result.success) {
    console.error('Pokemon data validation failed:', result.error);
    throw new Error('Invalid pokemon data');
  }

  return result.data;
}
```

### ランタイムバリデーション

```typescript
// コンテンツ読み込み時に自動バリデーション
export async function getPokemon(id: number): Promise<Pokemon> {
  const data = await readPokemonFile();
  const pokemon = data.find(p => p.id === id);

  if (!pokemon) {
    throw new Error(`Pokemon ${id} not found`);
  }

  return PokemonSchema.parse(pokemon); // Zodバリデーション
}
```

---

## データ整合性ルール

1. **ユニークID**: すべてのエンティティでIDは一意
2. **参照整合性**:
   - `Pokemon.evolution.prevId/nextIds` は存在するポケモンIDを参照
   - `Island.availablePokemon` は存在するポケモンIDを参照
3. **列挙値の統一**: SleepType、Specialtyなどは定義された値のみ
4. **必須フィールド**: `id`, `name` はすべてのエンティティで必須

---

## 今後の拡張性

### 追加予定のエンティティ（将来）
- **Ingredient（食材）**: 料理に使用する食材の詳細
- **Team（チーム）**: ユーザーが保存したチーム編成
- **Event（イベント）**: 期間限定イベント情報

### スキーマバージョニング
```typescript
export const PokemonSchemaV2 = PokemonSchema.extend({
  version: z.literal(2),
  newField: z.string().optional(),
});
```

---

## まとめ

このデータモデルは、ポケモンスリープ攻略サイトの全コンテンツを網羅し、Zodスキーマによる型安全性を確保しています。ファイルベースのシンプルな構造により、手動更新が容易で、Constitution原則に準拠しています。

**次のフェーズ**: API Contractsで、これらのデータを取得・操作するインターフェースを定義します。
