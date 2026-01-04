# Data API Contract: ポケモンスリープ攻略サイト

**Date**: 2026-01-02
**Feature**: ポケモンスリープ攻略サイト
**Type**: Internal Data Access Layer (Not HTTP API)

## 概要

このドキュメントは、ポケモンスリープ攻略サイトのデータアクセスレイヤーの契約を定義します。本プロジェクトは静的サイト生成（SSG）を使用するため、外部HTTPAPIではなく、TypeScript関数としてのデータアクセスインターフェースを提供します。

すべての関数は`lib/data/`ディレクトリに実装され、Next.js Server Components、静的ページ生成、クライアントサイドで使用されます。

---

## データアクセスパターン

### 1. Server-Side（ビルド時/SSR）
```typescript
// app/pokemon/[id]/page.tsx
import { getPokemonById } from '@/lib/data/pokemon';

export async function generateStaticParams() {
  const allPokemon = await getAllPokemon();
  return allPokemon.map(p => ({ id: p.id.toString() }));
}

export default async function PokemonPage({ params }: { params: { id: string } }) {
  const pokemon = await getPokemonById(parseInt(params.id));
  return <PokemonDetail pokemon={pokemon} />;
}
```

### 2. Client-Side（検索・フィルター）
```typescript
// components/pokemon/pokemon-search.tsx
'use client';
import { useState, useEffect } from 'react';
import { searchPokemon } from '@/lib/data/search';

export function PokemonSearch({ initialPokemon }: { initialPokemon: Pokemon[] }) {
  const [results, setResults] = useState(initialPokemon);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const filtered = searchPokemon(initialPokemon, query, filters);
    setResults(filtered);
  }, [query, filters]);

  return (/* ... */);
}
```

---

## Pokemon Data API

### getAllPokemon()

すべてのポケモンを取得します。

#### Signature
```typescript
export async function getAllPokemon(): Promise<Pokemon[]>
```

#### Returns
```typescript
Pokemon[] // 全ポケモンの配列
```

#### Example
```typescript
const allPokemon = await getAllPokemon();
console.log(allPokemon.length); // 150
```

#### Errors
- `DataValidationError`: JSONデータがPokemonSchemaに準拠していない場合
- `FileNotFoundError`: pokemon.jsonが見つからない場合

---

### getPokemonById()

IDで特定のポケモンを取得します。

#### Signature
```typescript
export async function getPokemonById(id: number): Promise<Pokemon>
```

#### Parameters
- `id` (number): ポケモンID（正の整数）

#### Returns
```typescript
Pokemon // 指定されたIDのポケモン
```

#### Example
```typescript
const pikachu = await getPokemonById(25);
console.log(pikachu.name); // "ピカチュウ"
```

#### Errors
- `NotFoundError`: 指定されたIDのポケモンが存在しない場合

---

### getPokemonByName()

名前でポケモンを検索します（部分一致）。

#### Signature
```typescript
export async function getPokemonByName(name: string): Promise<Pokemon[]>
```

#### Parameters
- `name` (string): 検索する名前（部分一致、大文字小文字区別なし）

#### Returns
```typescript
Pokemon[] // 名前が一致するポケモンの配列
```

#### Example
```typescript
const results = await getPokemonByName('ピカ');
// [{ id: 25, name: "ピカチュウ", ... }]
```

---

### getPokemonByIsland()

特定の島に出現するポケモンを取得します。

#### Signature
```typescript
export async function getPokemonByIsland(islandName: string): Promise<Pokemon[]>
```

#### Parameters
- `islandName` (string): 島の名前（例: "ワカクサ本島"）

#### Returns
```typescript
Pokemon[] // 指定された島に出現するポケモンの配列
```

#### Example
```typescript
const wakakusaPokemon = await getPokemonByIsland('ワカクサ本島');
```

---

### getEvolutionChain()

ポケモンの進化系統全体を取得します。

#### Signature
```typescript
export async function getEvolutionChain(pokemonId: number): Promise<Pokemon[]>
```

#### Parameters
- `pokemonId` (number): 起点となるポケモンID

#### Returns
```typescript
Pokemon[] // 進化系統のポケモン配列（進化順にソート）
```

#### Example
```typescript
const chain = await getEvolutionChain(25); // ピカチュウ
// [
//   { id: 172, name: "ピチュー", ... },
//   { id: 25, name: "ピカチュウ", ... },
//   { id: 26, name: "ライチュウ", ... }
// ]
```

---

## Search & Filter API

### searchPokemon()

キーワード検索、フィルター、ソートを組み合わせてポケモンを検索します。

#### Signature
```typescript
export function searchPokemon(
  pokemon: Pokemon[],
  options: SearchOptions
): Pokemon[]

interface SearchOptions {
  query?: string;             // キーワード検索
  sleepType?: SleepType;      // 睡眠タイプフィルター
  specialty?: Specialty;      // とくいフィルター
  island?: string;            // 島フィルター
  sortBy?: 'name' | 'id' | 'berryYield'; // ソート基準
  sortOrder?: 'asc' | 'desc'; // ソート順
}
```

#### Parameters
- `pokemon` (Pokemon[]): 検索対象のポケモン配列
- `options` (SearchOptions): 検索・フィルター・ソートオプション

#### Returns
```typescript
Pokemon[] // フィルター・ソートされたポケモン配列
```

#### Example
```typescript
const results = searchPokemon(allPokemon, {
  query: 'ピカ',
  sleepType: 'すやすや',
  sortBy: 'name',
  sortOrder: 'asc'
});
```

---

## Berry Data API

### getAllBerries()

すべてのきのみを取得します。

#### Signature
```typescript
export async function getAllBerries(): Promise<Berry[]>
```

#### Returns
```typescript
Berry[] // 全きのみの配列
```

---

### getBerryByName()

名前できのみを取得します。

#### Signature
```typescript
export async function getBerryByName(name: string): Promise<Berry | null>
```

#### Parameters
- `name` (string): きのみの名前（完全一致）

#### Returns
```typescript
Berry | null // 見つかった場合はBerry、見つからない場合はnull
```

#### Example
```typescript
const oran = await getBerryByName('オレンのみ');
console.log(oran?.energy); // 31
```

---

## Skill Data API

### getAllSkills()

すべてのメインスキルを取得します。

#### Signature
```typescript
export async function getAllSkills(): Promise<Skill[]>
```

---

### getSkillByName()

名前でスキルを取得します。

#### Signature
```typescript
export async function getSkillByName(name: string): Promise<Skill | null>
```

---

## Recipe Data API

### getAllRecipes()

すべての料理レシピを取得します。

#### Signature
```typescript
export async function getAllRecipes(): Promise<Recipe[]>
```

---

### getRecipesByType()

料理タイプでフィルタリングします。

#### Signature
```typescript
export async function getRecipesByType(type: Recipe['type']): Promise<Recipe[]>
```

#### Parameters
- `type` ('カレー' | 'サラダ' | 'デザート' | 'ドリンク'): 料理タイプ

#### Example
```typescript
const drinks = await getRecipesByType('ドリンク');
```

---

## Island Data API

### getAllIslands()

すべての島を取得します。

#### Signature
```typescript
export async function getAllIslands(): Promise<Island[]>
```

---

### getIslandByName()

名前で島を取得します。

#### Signature
```typescript
export async function getIslandByName(name: string): Promise<Island | null>
```

---

## Content (Markdown) API

### getAllContent()

特定カテゴリのコンテンツを取得します。

#### Signature
```typescript
export async function getAllContent(
  category?: Content['category']
): Promise<Content[]>
```

#### Parameters
- `category` (optional): 'mechanics' | 'strategies' | 'teams' | 'guides'

#### Returns
```typescript
Content[] // コンテンツ配列
```

#### Example
```typescript
const mechanicsGuides = await getAllContent('mechanics');
```

---

### getContentBySlug()

スラッグでコンテンツを取得します。

#### Signature
```typescript
export async function getContentBySlug(
  category: Content['category'],
  slug: string
): Promise<Content>
```

#### Parameters
- `category`: コンテンツカテゴリ
- `slug`: URLスラッグ（例: "sleep-types-guide"）

#### Returns
```typescript
Content // コンテンツオブジェクト（Markdown本文を含む）
```

#### Example
```typescript
const guide = await getContentBySlug('mechanics', 'sleep-types-guide');
console.log(guide.title); // "睡眠タイプの仕組みと活用法"
```

---

## Error Handling

### エラー型定義

```typescript
export class DataValidationError extends Error {
  constructor(message: string, public zodError: ZodError) {
    super(message);
    this.name = 'DataValidationError';
  }
}

export class NotFoundError extends Error {
  constructor(resource: string, identifier: string | number) {
    super(`${resource} not found: ${identifier}`);
    this.name = 'NotFoundError';
  }
}

export class FileNotFoundError extends Error {
  constructor(filePath: string) {
    super(`File not found: ${filePath}`);
    this.name = 'FileNotFoundError';
  }
}
```

### エラーハンドリング例

```typescript
try {
  const pokemon = await getPokemonById(999);
} catch (error) {
  if (error instanceof NotFoundError) {
    console.error('Pokemon not found:', error.message);
    // 404ページにリダイレクト
  } else if (error instanceof DataValidationError) {
    console.error('Invalid data:', error.zodError);
    // エラーログを送信
  } else {
    throw error;
  }
}
```

---

## Caching Strategy

### Server-Side（ビルド時）
```typescript
// データはビルド時に一度だけ読み込まれる
// Next.js SSGがページごとにキャッシュ
export async function getAllPokemon(): Promise<Pokemon[]> {
  // ファイル読み込みはビルド時のみ実行される
  const data = await fs.readFile('content/pokemon/pokemon.json', 'utf-8');
  return JSON.parse(data).pokemon;
}
```

### Client-Side（useMemo）
```typescript
import { useMemo } from 'react';

export function PokemonList({ allPokemon }: { allPokemon: Pokemon[] }) {
  const [filters, setFilters] = useState<SearchOptions>({});

  const filteredPokemon = useMemo(() => {
    return searchPokemon(allPokemon, filters);
  }, [allPokemon, filters]); // filtersが変更されたときのみ再計算

  return (/* ... */);
}
```

---

## Performance Considerations

### データサイズ見積もり
- Pokemon: 200体 × 2KB = 400KB
- Berry: 30種類 × 0.5KB = 15KB
- Skill: 50種類 × 1KB = 50KB
- Recipe: 100種類 × 1KB = 100KB
- **Total**: 〜565KB（圧縮前）

### 最適化戦略
1. **Next.js Image Optimization**: 画像は自動的にWebP変換・最適化
2. **Code Splitting**: 各ページごとにバンドル分割
3. **Tree Shaking**: 未使用のデータアクセス関数は除外
4. **JSON Minification**: 本番ビルド時にJSONを圧縮

---

## Testing Contract

### ユニットテスト例

```typescript
import { describe, it, expect, beforeAll } from 'vitest';
import { getAllPokemon, getPokemonById } from '@/lib/data/pokemon';

describe('Pokemon Data API', () => {
  let allPokemon: Pokemon[];

  beforeAll(async () => {
    allPokemon = await getAllPokemon();
  });

  it('should return all pokemon', () => {
    expect(allPokemon).toBeInstanceOf(Array);
    expect(allPokemon.length).toBeGreaterThan(0);
  });

  it('should get pokemon by id', async () => {
    const pikachu = await getPokemonById(25);
    expect(pikachu.name).toBe('ピカチュウ');
    expect(pikachu.sleepType).toBe('すやすや');
  });

  it('should throw NotFoundError for invalid id', async () => {
    await expect(getPokemonById(9999)).rejects.toThrow(NotFoundError);
  });
});
```

---

## まとめ

このData API Contractは、ポケモンスリープ攻略サイトの全データアクセスパターンを定義しています。HTTPAPIではなくTypeScript関数としてのインターフェースにより、型安全性を確保しつつ、Next.js SSG/SSRとシームレスに統合します。

**次のフェーズ**: quickstart.mdで開発環境のセットアップ手順を文書化します。
