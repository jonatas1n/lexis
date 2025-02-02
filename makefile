# Start the project in detached mode
up:
	docker compose up -d

# Attach to the API container
attach:
	docker compose exec api bash

# View logs in real-time
logs:
	docker compose logs -f

# Stop all running containers
stop:
	docker compose stop

# Install dependencies for both API and UI
install:
	docker compose exec api pip install -r requirements.txt
	docker compose exec ui yarn

# Run linter for the API (Black)
lint:
	docker compose exec api black .
	docker compose exec ui yarn eslint --fix
	docker compose exec ui yarn tsc

# Run tests using pytest
test:
	docker compose exec api pytest
	docker compose exec ui yarn test
