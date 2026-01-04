---
description: Constitution に従ってコミットを実行（対話的にファイル選択可能）
allowed-tools: Bash(git:*), Bash(bun:*), Bash(bunx:*)
---

# Constitution準拠コミット

**`.specify/memory/constitution.md` に記載されているすべてのルールを厳守してコミットを実行してください。**

## 実行手順

### 1. 現在の変更を確認

!`git status`

### 2. ユーザーにファイル選択を依頼

上記の変更ファイルから、どのファイルを add/commit するか選択してもらってください。
- 複数ファイル選択可能
- すべて選択も可能
- ファイルパスを正確に確認

### 3. 選択されたファイルを add

ユーザーが選択したファイルを `git add` してください。

### 4. ステージング内容を確認

!`git diff --staged`

### 5. Constitution遵守でコミット

特に以下を遵守：
- **Test-Driven Development (NON-NEGOTIABLE)**: テストが通っていることを確認
- **Git Commit規約**: Conventional Commits形式、日本語メッセージ
- **Governance**: Constitution遵守の確認

コミットメッセージを生成し、ユーザーの承認を得てからコミットを実行してください。
