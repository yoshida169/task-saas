.PHONY: dev dev-frontend dev-backend

# フロントエンド + バックエンドを同時起動
dev:
	@echo "Starting backend (Go :8080) and frontend (Nuxt :3000)..."
	@trap 'kill 0' EXIT; \
		$(MAKE) dev-backend & \
		$(MAKE) dev-frontend & \
		wait

dev-backend:
	cd backend && go run main.go

dev-frontend:
	cd frontend && npm run dev
