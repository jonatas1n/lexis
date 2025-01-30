up:
	docker compose up -d

attach:
	docker compose exec api bash

logs:
	docker compose logs -f

stop:
	docker compose stop

install:
	pip install -r requirements.txt

lint:
	black .

test:
	pytest
