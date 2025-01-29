install:
	pip install -r requirements.txt

lint:
	black .

test:
	pytest