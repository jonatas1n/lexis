install:
	pip install -r requirements.txt

lint:
	black .

api:
	./fastapi dev ./api/src/api.py

test:
	pytest
