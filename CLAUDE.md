# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# 両方同時起動（推奨）
make dev

# 個別起動
make dev-frontend   # Nuxt フロントエンド（:3000）
make dev-backend    # Go バックエンド（:8080）

# インフラ
docker-compose up   # PostgreSQL（:5432）起動
```

フロントエンド単体:
```bash
cd frontend
npm install
npm run dev
npm run build
```

バックエンド単体:
```bash
cd backend
go run main.go
```

## Architecture

**フロントエンド:** Nuxt 4 (Vue 3) + Pinia + Tailwind CSS（port 3000）
**バックエンド:** Go 1.22 stdlib（port 8080）
**DB:** PostgreSQL（docker-compose）

### 認証フロー

1. `POST /login` → Go バックエンドがトークンを返す
2. `app/stores/auth.ts`（Pinia）がユーザー情報とトークンをクッキーで保持
3. `app/middleware/auth.global.ts` がすべてのルートに適用され、未認証なら `/login` へリダイレクト
4. `app/composables/useApi.ts` がすべての API リクエストに `Authorization` ヘッダーを付与

### API 層の構成

- `frontend/server/api/` — Nuxt サーバールート（SSR 側、現在はインメモリストア `server/utils/taskStore.ts` を使用）
- `backend/main.go` — Go バックエンド（認証エンドポイントのみ実装済み）
- `app/composables/useApi.ts` — クライアントサイドの API ラッパー

### 現状・注意点

- 認証はモック実装（実際の DB 検証なし）
- タスクデータはインメモリストア（`taskStore.ts`）に保存されており、再起動で消える
- PostgreSQL の接続はまだバックエンドに組み込まれていない
- 公開ページ: `/login`, `/signup`。それ以外はすべて認証必須
