up:
	docker compose up -d

attach:
	docker compose exec api bash

attach-ui:
	docker compose exec ui bash

logs:
	docker compose logs -f

stop:
	docker compose stop

install:
	docker compose exec api pip install -r requirements.txt
	docker compose exec ui yarn

lint:
	docker compose exec api black .
	docker compose exec ui yarn lint:format

test:
	pytest
