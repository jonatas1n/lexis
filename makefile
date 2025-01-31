up:
	docker compose up -d

attach:
	docker compose exec api bash

logs:
	docker compose logs -f

stop:
	docker compose stop

install:
	docker compose exec api pip install -r requirements.txt
	docker compose exec ui yarn

lint:
	docker compose exec api black .

test:
	pytest
