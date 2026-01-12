# タスク完了時のチェックリスト

## 必須事項（NON-NEGOTIABLE）

### 1. Test-Driven Development（TDD）の遵守
- [ ] Red-Green-Refactorサイクルを実施
- [ ] すべての新機能・変更にテストを作成
- [ ] テストが通ることを確認

### 2. テストの実行
```bash
cd apps/web
bun run test
```
- [ ] すべてのテストがパスすることを確認
- [ ] テストカバレッジが適切であることを確認

### 3. ビルドの確認
```bash
# プロジェクトルートから
bun build

# または個別アプリで
cd apps/web
bun build
```
- [ ] ビルドエラーがないことを確認
- [ ] TypeScriptの型エラーがないことを確認

### 4. コーディング規約の遵守
- [ ] TypeScript strict modeに準拠
- [ ] `any`型を使用していない（必要な場合はコメントで理由を説明）
- [ ] 命名規則に従っている
- [ ] Server Component優先の原則を守っている
- [ ] すべてのPropsに型を明示している

### 5. Git規約の遵守
- [ ] Conventional Commits形式でコミットメッセージを作成
- [ ] 日本語で記述
- [ ] **重要**: Co-Authored-Byなどのフッターを含めない
- [ ] 適切なtype（feat, fix, docs, test等）を使用
- [ ] スコープを指定（可能な場合）

## 推奨事項

### コードレビュー（自己チェック）
- [ ] コードの可読性は十分か
- [ ] 過度な抽象化を避けているか（YAGNI原則）
- [ ] 200行以内のコンポーネント分割を意識しているか
- [ ] 再利用可能な部分は適切に分離しているか

### ドキュメント
- [ ] 必要に応じてコメントを追加（複雑なロジックの場合）
- [ ] READMEやドキュメントの更新が必要な場合は更新

### パフォーマンス
- [ ] 不要なre-renderを避けているか
- [ ] Server Componentを適切に活用しているか

## タスク完了の最終確認

### チェック項目すべてクリア
- [ ] テストがすべてパス
- [ ] ビルドが成功
- [ ] コーディング規約を遵守
- [ ] Git規約に従ったコミットメッセージ
- [ ] 開発原則（Constitution）に準拠

### 完了コマンド例
```bash
# テスト実行
cd apps/web && bun run test

# ビルド確認
cd ../.. && bun build

# Git操作
git add .
git commit -m "feat(pokemon): ポケモン詳細ページを追加"
git push
```
