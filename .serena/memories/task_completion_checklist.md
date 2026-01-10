# タスク完了時のチェックリスト

## ⚠️ Constitution参照

**タスク実行前に必ず `.specify/memory/constitution.md` を確認してください。**

このチェックリストは Constitution に基づいています。

## Constitution（開発原則）遵守事項

### I. Test-Driven Development（TDD）- **必須**

タスク完了前に以下を確認：

1. **テストを先に書いた**
   - [ ] Red-Green-Refactor サイクルを遵守
   - [ ] すべての新機能・変更にテストが存在する
   - [ ] テストなしのコードはマージしない

2. **テストが通っている**
   ```bash
   cd apps/web
   bun test
   ```

### II. Simplicity（シンプルさ）

- [ ] YAGNI原則を遵守（必要になるまで複雑さを追加しない）
- [ ] 明確な理由なく抽象化していない
- [ ] 不要なコードを削除した

### III. コード品質

1. **Linting**
   ```bash
   cd apps/web
   bunx eslint .
   ```
   - [ ] Lintエラーがない

2. **型チェック**
   ```bash
   cd apps/web
   bunx tsc --noEmit
   ```
   - [ ] TypeScriptの型エラーがない

3. **ビルド確認**
   ```bash
   cd apps/web
   bun run build
   ```
   - [ ] ビルドが成功する

### IV. Git Commit

- [ ] Conventional Commitsに従っている
- [ ] コミットメッセージが日本語で明確
- [ ] 適切なtypeとscopeを使用

### V. ドキュメント

- [ ] 必要に応じてドキュメントを更新
- [ ] CLAUDE.md の更新が必要な場合は更新
- [ ] README.md の更新が必要な場合は更新

## 実行順序

タスク完了時は以下の順序で確認すること：

1. テスト実行 → **全てパス**
2. Lint実行 → **エラーなし**
3. 型チェック → **エラーなし**
4. ビルド → **成功**
5. Gitコミット → **Conventional Commits遵守**

## スクリプト例

```bash
# タスク完了前の一括チェック（Webアプリ）
cd apps/web
bun test && bunx eslint . && bunx tsc --noEmit && bun run build
```
