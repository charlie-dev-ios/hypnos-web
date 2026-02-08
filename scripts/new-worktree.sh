#!/bin/bash
set -euo pipefail

# Usage: ./scripts/new-worktree.sh <branch-name>
# Example: ./scripts/new-worktree.sh work/my-feature
#
# This script must be run from the bare repo root:
#   cd /path/to/hypnos-web.git && ./main/scripts/new-worktree.sh work/my-feature
#
# What it does:
#   1. git worktree add <branch-name> -b <branch-name>
#   2. mise trust
#   3. bun install
#   4. Open claude (with --dangerously-skip-permissions to skip trust dialog)

if [ -z "${1:-}" ]; then
  echo "Usage: $0 <branch-name>"
  echo "Example: $0 work/my-feature"
  exit 1
fi

BRANCH_NAME="$1"

# Detect bare repo root
# If run from within a worktree, find the bare repo root
GIT_COMMON_DIR="$(git rev-parse --git-common-dir 2>/dev/null)"
if [ -z "$GIT_COMMON_DIR" ]; then
  echo "Error: Not in a git repository"
  exit 1
fi

# For bare repos, --git-common-dir returns "." when already at the bare root,
# or the absolute path to the bare repo when in a worktree
if [ "$GIT_COMMON_DIR" = "." ]; then
  BARE_ROOT="$(pwd)"
else
  BARE_ROOT="$(cd "$GIT_COMMON_DIR" && pwd)"
fi

WORKTREE_PATH="$BARE_ROOT/$BRANCH_NAME"

echo "==> Creating worktree: $WORKTREE_PATH (branch: $BRANCH_NAME)"
git worktree add "$WORKTREE_PATH" -b "$BRANCH_NAME"

cd "$WORKTREE_PATH"

echo "==> Running mise trust..."
mise trust

echo "==> Activating mise environment..."
eval "$(mise env)"

echo "==> Installing dependencies with bun..."
bun install

echo "==> Opening Claude Code..."
exec claude
