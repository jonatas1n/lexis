# Lexis - Project Overview

This project is a job test for Quorum, implementing a system to manage and interact with legislative data.

It consists of two main services:
- **API**: A FastAPI backend running on port `8000`, built with Python + FastAPI.
- **UI**: A frontend application running on port `3000`, built with React + Typescript + Vite.

Both services are managed via Docker Compose.

## Prerequisites

- Docker & Docker Compose
- Make (optional, but recommended)

## Setup & Usage

To start the project, run:

```sh
make up
```

If you don’t have `make`, run the following command manually:

```sh
docker compose up -d
```

Now, the project is ready to go, and you can access it at [http://localhost:3000](http://localhost:3000).

### Available Commands

These commands can be run using `make <command>` or manually by running the corresponding `docker compose` commands.

#### Start the project
```sh
make up
```
Or manually:
```sh
docker compose up -d
```

#### Attach to the API container
```sh
make attach
```
Or manually:
```sh
docker compose exec api bash
```

#### View logs in real-time
```sh
make logs
```
Or manually:
```sh
docker compose logs -f
```

#### Stop services
```sh
make stop
```
Or manually:
```sh
docker compose stop
```

#### Install dependencies
```sh
make install
```
Or manually:
```sh
docker compose exec api pip install -r requirements.txt
docker compose exec ui yarn
```

#### Run linter (Black for Python)
```sh
make lint
```
Or manually:
```sh
docker compose exec api black .
```

#### Run tests
```sh
make test
```
Or manually:
```sh
pytest
```

## API Documentation

Once the API is running, you can access the Swagger documentation at:

[http://localhost:8000/docs](http://localhost:8000/docs)

