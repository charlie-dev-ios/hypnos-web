# Implementation Tasks: ポケモンスリープ攻略サイト

**Feature**: ポケモンスリープ攻略サイト
**Branch**: `001-pokemon-sleep-site`
**Date**: 2026-01-02

## Summary

このタスクリストは、ポケモンスリープ攻略サイトの実装を**ユーザーストーリーごと**に整理しています。各ユーザーストーリーは独立してテスト可能で、段階的に価値を提供できるよう設計されています。

**ユーザーストーリー**:
- **US1 (P1)**: 攻略コンテンツの閲覧 - トップ画面とナビゲーション
- **US2 (P1)**: ポケモン詳細の閲覧 - ポケモン図鑑と検索機能
- **US3 (P2)**: モバイルデバイスでの閲覧 - レスポンシブ対応

**Total Tasks**: 64タスク
**Estimated Timeline**: 3-4週間（MVP: US1のみで1週間）

---

## Implementation Strategy

### MVP First (Minimum Viable Product)
**推奨MVP**: User Story 1のみ実装（Phase 1 + Phase 2 + Phase 3）

- トップ画面とナビゲーションが動作
- 基本的なコンテンツページ（Markdownベース）が表示
- デスクトップで完全動作
- **Value**: ユーザーは攻略情報にアクセス可能

### Incremental Delivery
1. **Week 1**: Phase 1-3 (US1) → デプロイ可能なMVP
2. **Week 2**: Phase 4 (US2) → ポケモン図鑑追加
3. **Week 3**: Phase 5 (US3) → モバイル対応
4. **Week 4**: Phase 6 (Polish) → 最終調整

---

## User Story Dependencies

```
Phase 1 (Setup)
    ↓
Phase 2 (Foundation)
    ↓
    ├─→ Phase 3 (US1) [P1] ← MVP
    ├─→ Phase 4 (US2) [P1] ← 独立実装可能
    └─→ Phase 5 (US3) [P2] ← US1/US2完了後に実装推奨
         ↓
Phase 6 (Polish)
```

**Notes**:
- US1とUS2は技術的に独立だが、US1（ナビゲーション）が先推奨
- US3（モバイル対応）はUS1/US2完了後が効率的
- すべてのフェーズはConstitution TDD原則に従う（テスト→実装）

---

## Phase 1: Setup & Project Initialization

**Goal**: Next.jsプロジェクトをセットアップし、shadcn/ui、Vitest、基本構造を準備

**Parallel Opportunities**: T002-T006は並行実行可能

### Tasks

- [X] T001 Create Next.js project with Bun in pokemon-sleep-site/ directory
- [X] T002 [P] Install shadcn/ui and initialize with components.json
- [X] T003 [P] Install Zod for schema validation
- [X] T004 [P] Install Vitest and React Testing Library with vitest.config.ts
- [X] T005 [P] Install react-markdown and remark-gfm for Markdown rendering
- [X] T006 [P] Create directory structure per plan.md (app/, components/, lib/, content/, tests/)
- [X] T007 Configure Next.js in next.config.js (image optimization, Bun compatibility)
- [X] T008 Setup Tailwind CSS with custom theme in tailwind.config.ts
- [X] T009 Create test setup file in tests/setup.ts
- [X] T010 Install base shadcn/ui components (card, button, input, sheet, select, checkbox, separator, skeleton)

**Completion Criteria**:
- ✅ `bun run dev` でNext.js開発サーバーが起動
- ✅ `bun test` でVitestが実行可能
- ✅ shadcn/uiコンポーネントがcomponents/ui/にインストール済み

---

## Phase 2: Foundational Layer (Blocking Prerequisites)

**Goal**: すべてのユーザーストーリーで使用する共通基盤を実装

**Parallel Opportunities**: T011-T015は並行実行可能

### Tasks

- [X] T011 [P] Create Zodスキーマ in lib/schemas/pokemon.ts (Pokemon, SleepType, Specialty)
- [X] T012 [P] Create Zodスキーマ in lib/schemas/berry.ts
- [X] T013 [P] Create Zodスキーマ in lib/schemas/skill.ts
- [X] T014 [P] Create Zodスキーマ in lib/schemas/recipe.ts
- [X] T015 [P] Create Zodスキーマ in lib/schemas/island.ts
- [X] T016 [P] Create Zodスキーマ in lib/schemas/content.ts (Markdown content)
- [X] T017 Create sample Pokemon data in content/pokemon/pokemon.json (minimum 5 pokemon)
- [X] T018 Create sample Markdown content in content/mechanics/sleep-types.md
- [X] T019 Implement getAllPokemon() in lib/data/pokemon.ts with Zod validation
- [X] T020 Write unit test for getAllPokemon() in tests/unit/lib/data/pokemon.test.ts
- [X] T021 Implement getPokemonById() in lib/data/pokemon.ts
- [X] T022 Write unit test for getPokemonById() in tests/unit/lib/data/pokemon.test.ts
- [X] T023 Implement getAllContent() in lib/data/content.ts for Markdown files
- [X] T024 Write unit test for getAllContent() in tests/unit/lib/data/content.test.ts
- [X] T025 Create root layout in app/layout.tsx with basic structure and metadata

**Completion Criteria**:
- ✅ すべてのZodスキーマが定義済み
- ✅ データ取得関数がユニットテスト済み
- ✅ サンプルデータがバリデーション通過

---

## Phase 3: User Story 1 - 攻略コンテンツの閲覧 (P1)

**Goal**: トップ画面と基本ナビゲーションを実装し、コンテンツセクションにアクセス可能にする

**Independent Test**: トップ画面を読み込み、カードをクリックして各コンテンツページに遷移でき、ホームに戻れることを確認

**Acceptance Criteria**:
1. トップ画面に6つのコンテンツセクションカードが表示される
2. 各カードをクリックすると対応するページに遷移
3. すべてのページからホームに戻るリンクがある

### Tasks

#### UI Components
- [X] T026 [US1] Install shadcn/ui Card component with `bunx shadcn@latest add card`
- [X] T027 [US1] Create TopNav component in components/navigation/top-nav.tsx (card-based navigation)
- [X] T028 [US1] Write component test for TopNav in tests/unit/components/navigation/top-nav.test.tsx
- [X] T029 [US1] Create Breadcrumb component in components/navigation/breadcrumb.tsx
- [X] T030 [US1] Create LoadingIndicator component in components/common/loading-indicator.tsx

#### Pages
- [X] T031 [US1] Create top page in app/(home)/page.tsx with TopNav cards
- [X] T032 [US1] Create mechanics page in app/mechanics/page.tsx displaying Markdown content
- [X] T033 [US1] Create strategies page in app/strategies/page.tsx displaying Markdown content
- [X] T034 [US1] Create teams page in app/teams/page.tsx displaying Markdown content
- [X] T035 [US1] Create recipes page in app/recipes/page.tsx (placeholder)
- [X] T036 [US1] Create islands page in app/islands/page.tsx (placeholder)

#### Testing
- [X] T037 [US1] Write integration test for navigation flow in tests/integration/navigation.test.tsx
- [X] T038 [US1] Verify all acceptance scenarios pass (top page → sections → home)

**Completion Criteria**:
- ✅ トップ画面に6つのカードが表示
- ✅ カードクリックでコンテンツページに遷移
- ✅ すべてのページからホームに戻れる
- ✅ ナビゲーション統合テストがパス

---

## Phase 4: User Story 2 - ポケモン詳細の閲覧 (P1)

**Goal**: ポケモン図鑑ページと詳細ページを実装し、検索・フィルター・ソート機能を提供

**Independent Test**: ポケモン図鑑ページでポケモンリストを表示し、検索・フィルターが動作し、詳細ページに遷移できることを確認

**Acceptance Criteria**:
1. ポケモン一覧ページでポケモンリストが表示される
2. 検索・フィルター（睡眠タイプ、とくい）・ソート（名前順）が動作
3. ポケモンをクリックすると詳細ページに遷移し、全情報が表示される
4. 進化系統をクリックすると進化先ポケモンの詳細に遷移

### Tasks

#### Data Layer
- [X] T039 [US2] Implement searchPokemon() in lib/data/search.ts (keyword, filter, sort)
- [X] T040 [US2] Write unit test for searchPokemon() in tests/unit/lib/data/search.test.ts
- [X] T041 [US2] Implement getPokemonByName() in lib/data/pokemon.ts
- [X] T042 [US2] Implement getEvolutionChain() in lib/data/pokemon.ts
- [X] T043 [US2] Write unit tests for getPokemonByName and getEvolutionChain

#### UI Components
- [X] T044 [P] [US2] Create PokemonCard component in components/pokemon/pokemon-card.tsx
- [X] T045 [P] [US2] Create PokemonList component in components/pokemon/pokemon-list.tsx
- [X] T046 [P] [US2] Create PokemonDetail component in components/pokemon/pokemon-detail.tsx
- [X] T047 [US2] Create PokemonSearch component in components/pokemon/pokemon-search.tsx (with filters)
- [X] T048 [US2] Create SearchBar component in components/common/search-bar.tsx
- [X] T049 [US2] Write component tests for Pokemon components in tests/unit/components/pokemon/

#### Pages
- [X] T050 [US2] Create pokemon list page in app/pokemon/page.tsx with search/filter/sort
- [X] T051 [US2] Create pokemon detail page in app/pokemon/[id]/page.tsx with generateStaticParams
- [X] T052 [US2] Implement static generation for all pokemon pages in app/pokemon/[id]/page.tsx

#### Testing
- [X] T053 [US2] Write integration test for pokemon search flow in tests/integration/pokemon-search.test.tsx
- [X] T054 [US2] Verify all acceptance scenarios pass (list → filter → detail → evolution)

**Completion Criteria**:
- ✅ ポケモン一覧が表示され、検索・フィルター・ソートが動作
- ✅ 詳細ページで全情報が表示（睡眠タイプ、きのみ、スキル、進化系統）
- ✅ 進化系統クリックで遷移可能
- ✅ すべてのポケモンページがSSGで生成

---

## Phase 5: User Story 3 - モバイルデバイスでの閲覧 (P2)

**Goal**: モバイルデバイス対応のレスポンシブデザインとハンバーガーメニューを実装

**Independent Test**: スマートフォン（320px〜768px）でサイトにアクセスし、ハンバーガーメニューが動作し、コンテンツが横スクロールなしで表示されることを確認

**Acceptance Criteria**:
1. モバイル画面でハンバーガーメニューが表示される
2. メニューをタップすると全セクションへのリンクが表示
3. テキストと画像が画面幅に収まり、横スクロール不要
4. レイアウトが崩れずスムーズに動作

### Tasks

#### UI Components
- [X] T055 [US3] Install shadcn/ui Sheet component with `bunx shadcn@latest add sheet` (mobile menu)
- [X] T056 [US3] Create MobileNav component in components/navigation/mobile-nav.tsx (hamburger menu)
- [X] T057 [US3] Write component test for MobileNav in tests/unit/components/navigation/mobile-nav.test.tsx

#### Responsive Design
- [X] T058 [US3] Update app/layout.tsx to include responsive nav (desktop: TopNav, mobile: MobileNav)
- [X] T059 [US3] Add Tailwind responsive classes to TopNav for md:grid layout
- [X] T060 [US3] Add Tailwind responsive classes to all page components for mobile-first design
- [X] T061 [US3] Update PokemonList to use responsive grid (1 column mobile, 2 tablet, 3 desktop)
- [X] T062 [US3] Test responsive design on multiple screen sizes (320px, 768px, 1024px)

#### Testing
- [X] T063 [US3] Write integration test for mobile navigation in tests/integration/mobile-nav.test.tsx
- [X] T064 [US3] Verify all acceptance scenarios pass on mobile viewport

**Completion Criteria**:
- ✅ モバイル（320px-768px）でハンバーガーメニュー表示
- ✅ すべてのコンテンツが横スクロールなしで表示
- ✅ デスクトップ・タブレット・モバイルで正しく動作
- ✅ モバイルナビゲーション統合テストがパス

---

## Phase 6: Polish & Cross-Cutting Concerns

**Goal**: パフォーマンス最適化、エラーハンドリング、SEO対応

### Tasks

- [X] T065 Add Next.js metadata API to all pages for SEO (title, description, OG tags)
- [X] T066 Optimize images with next/image component across all pages
- [X] T067 Create custom 404 error page in app/not-found.tsx
- [X] T068 Add error boundaries in app/error.tsx
- [X] T069 Implement Suspense and Loading states with skeleton components
- [X] T070 Run Lighthouse audit and fix performance issues (target: >90 score)
- [X] T071 Test page load time on 3G connection (<3 seconds)
- [X] T072 Create sitemap.xml for SEO
- [X] T073 Add robots.txt
- [X] T074 Final cross-browser testing (Chrome, Safari, Firefox, Edge)

**Completion Criteria**:
- ✅ Lighthouse Performance/Accessibility > 90
- ✅ ページ読み込み時間 < 3秒
- ✅ エラーページとローディング状態が実装済み

---

## Parallel Execution Examples

### Phase 1 (Setup)
```bash
# 並行実行可能（異なるファイル）
Terminal 1: T002 - shadcn/ui install
Terminal 2: T003 - Zod install
Terminal 3: T004 - Vitest setup
```

### Phase 2 (Foundation)
```bash
# スキーマ作成は並行可能
Terminal 1: T011 - pokemon.ts schema
Terminal 2: T012 - berry.ts schema
Terminal 3: T013 - skill.ts schema
```

### Phase 4 (US2)
```bash
# コンポーネント作成は並行可能
Terminal 1: T044 - PokemonCard component
Terminal 2: T045 - PokemonList component
Terminal 3: T046 - PokemonDetail component
```

---

## Testing Strategy (TDD)

各フェーズでRed-Green-Refactorサイクルを実施：

1. **Red**: テストを先に書く（失敗を確認）
2. **Green**: 最小限の実装でテストをパス
3. **Refactor**: コードを改善（テストは継続的にパス）

**例（T040: searchPokemon()のテスト）**:
```typescript
// 1. Red: テストを書く
it('should filter pokemon by sleep type', () => {
  const result = searchPokemon(mockData, { sleepType: 'すやすや' });
  expect(result.every(p => p.sleepType === 'すやすや')).toBe(true);
});

// 2. Green: 実装
export function searchPokemon(pokemon: Pokemon[], options: SearchOptions) {
  return pokemon.filter(p => p.sleepType === options.sleepType);
}

// 3. Refactor: より汎用的に改善
```

---

## Notes

### Conventions
- **[P]**: 並行実行可能タスク（異なるファイル、依存関係なし）
- **[US1]/[US2]/[US3]**: ユーザーストーリーラベル
- **Task ID**: 実行順序を示す（T001, T002...）

### File Path References
すべてのタスクは具体的なファイルパスを含んでいます。例：
- `app/pokemon/page.tsx`
- `lib/data/search.ts`
- `tests/unit/lib/data/pokemon.test.ts`

### Independent Testing
各ユーザーストーリーは独立してテスト可能：
- **US1**: トップ画面→セクション→ホーム
- **US2**: ポケモン一覧→検索→詳細→進化
- **US3**: モバイルメニュー→ナビゲーション→コンテンツ表示

---

## Summary

| Phase | User Story | Tasks | Parallel | Priority |
|-------|-----------|-------|----------|----------|
| 1 | Setup | T001-T010 | 5タスク | - |
| 2 | Foundation | T011-T025 | 6タスク | - |
| 3 | US1 (コンテンツ閲覧) | T026-T038 | 3タスク | P1 |
| 4 | US2 (ポケモン図鑑) | T039-T054 | 4タスク | P1 |
| 5 | US3 (モバイル対応) | T055-T064 | 1タスク | P2 |
| 6 | Polish | T065-T074 | 多数 | - |
| **Total** | - | **74タスク** | **19並行** | - |

**Recommended MVP**: Phase 1-3 (38 tasks) → 1週間でデプロイ可能

**Full Feature**: すべてのフェーズ → 3-4週間で完了

---

次のステップ: `bun run dev` で開発を開始し、Phase 1のT001から実装を進めてください。
