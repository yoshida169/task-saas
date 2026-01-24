# アプリケーション概要

本アプリケーションは **チーム向けタスク管理SaaS（Task SaaS）** です。  
Nuxt 4 を用いたフロントエンドと、Nuxt Nitro（server/api）を用いた簡易バックエンド構成で、  
「認証付き・API駆動・Kanban形式のタスク管理」をMVPとして実装しています。

## 技術スタック

### フロントエンド

- Nuxt 4
- Vue 3 (script setup)
- Pinia（認証状態管理）
- TypeScript
- $fetch + composable (`useApi`)

### バックエンド（現状）

- Nuxt Nitro (server/api)
- インメモリデータストア（`server/utils/taskStore.ts`）

### 認証

- 擬似ログイン
- Cookie ベース
  - `token`
  - `user`
- Authorization: Bearer トークン方式

## プロジェクト構造

- このプロジェクトは Nuxt 4 のディレクトリ構造に従います。
- メインのアプリケーションコードは `app/` ディレクトリにあります。
  - `app/pages/`: アプリケーションのルート。
  - `app/components/`: 再利用可能な Vue コンポーネント。
  - `app/layouts/`: レイアウトコンポーネント。
  - `app/composables/`: 自動インポートされるコンポーザブル。
- 設定は `nuxt.config.ts` にあります。

## 機能

### 認証・認可

- ログイン / ログアウト
- Cookie による認証状態保持
- Pinia によるユーザー状態管理
- グローバル route middleware による認証ガード
- API 401 時の自動ログアウト & `/login` リダイレクト

### プロジェクト

- プロジェクト一覧取得（API）
- プロジェクト詳細表示
- プロジェクト配下タスク一覧取得

### タスク

- タスク一覧 API
- タスク詳細 API
- Kanban（ToDo / Doing / Done）表示
- タスクステータス更新（PATCH）
- 楽観的UI更新

### API設計

- REST風エンドポイント
- 認証必須 API（Bearer）
- GET / PATCH 分離
- 共有インメモリストアで状態一貫性確保

## 現状の制約・前提

- DB 未導入（インメモリ）
- サーバー再起動でデータ消失
- ユーザー / チーム / 権限は簡易表現
- assignee は文字列（ユーザーID未連携）

## 実装予定の機能

### 優先度：高

#### 認証・基盤

- JWT or セッション方式への移行
- Go API + DB（PostgreSQL等）への置き換え
- CORS / env 切り替え対応

#### タスク管理

- タスク作成 / 編集 / 削除
- ドラッグ & ドロップによるステータス変更
- コメント機能

#### UX改善

- useAsyncData への置き換え
- ローディング / エラー表示
- 空状態UI

### 優先度：中

#### RBAC

- viewer / member / admin 権限
- 権限によるUI制御

#### チーム

- チーム作成
- メンバー招待
- ロール管理

### 優先度：低

- ファイル添付
- Markdown対応
- 通知機能
- テスト（Unit / E2E）

## コーディングガイドライン

### Vue & Nuxt

- `<script setup lang="ts">` を使用した **Vue 3 Composition API** を使用してください。
- すべてのスクリプトロジックに **TypeScript** を使用してください。`any` 型は避け、props、emits、data にはインターフェースや型を定義してください。
- 手動インポートの代わりに、可能な限り Nuxt 4 の自動インポート機能（コンポーネント、コンポーザブル、ユーティリティ）を使用してください。

### 命名規則

- **コンポーネント**: PascalCase を使用してください（例: `TaskCard.vue`, `UserProfile.vue`）。
- **ファイル/ディレクトリ**: `pages/` 内のルーティングファイルには kebab-case を使用してください（例: `pages/user-profile.vue`）。
- **コンポーザブル**: `use` で始まる camelCase を使用してください（例: `useAuth.ts`）。

### 状態管理

- Nuxt アプリ内の単純な共有状態には `useState` を使用してください。
- （後で Pinia が追加された場合）複雑なグローバル状態管理には Pinia を使用してください。

## 回答ガイドライン

- Nuxt 4 のベストプラクティスに従った、モダンでクリーンなコードソリューションを提供してください。
- 概念を説明する際は簡潔にし、現在のコンテキストに関連する「方法」と「理由」に焦点を当ててください。
- **言語**: 特に指定がない限り、**日本語**で回答してください。
