FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/api

WORKDIR /app/api

RUN chmod +x /app/api/run.sh

ENTRYPOINT ["/app/api/run.sh"]
