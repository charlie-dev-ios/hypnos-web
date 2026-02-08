#!/bin/bash
set -euo pipefail

# Usage: ./new-worktree.sh <branch-name>
# Example: ./new-worktree.sh work/my-feature
#
# This script should be placed at the bare repo root.

if [ -z "${1:-}" ]; then
  echo "Usage: $0 <branch-name>"
  echo "Example: $0 work/my-feature"
  exit 1
fi

BRANCH_NAME="$1"
BARE_ROOT="$(cd "$(dirname "$0")" && pwd)"
WORKTREE_PATH="$BARE_ROOT/$BRANCH_NAME"

echo "==> Creating worktree: $WORKTREE_PATH (branch: $BRANCH_NAME)"
git worktree add "$WORKTREE_PATH" -b "$BRANCH_NAME"

echo "==> cd $WORKTREE_PATH"
cd "$WORKTREE_PATH"

echo "==> Running mise trust..."
mise trust

echo "==> Installing dependencies with bun..."
bun install

echo "==> Opening Claude Code..."
exec claude --dangerously-skip-permissions
