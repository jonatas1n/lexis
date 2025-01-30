up:
	docker compose up -d

attach:
	docker compose exec legislative_api bash

logs:
	docker compose logs -f

install:
	pip install -r requirements.txt

lint:
	black .

test:
	pytest
