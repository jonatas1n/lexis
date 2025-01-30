#!/bin/bash

set -e

pip install --no-cache-dir -r requirements.txt

exec fastapi dev ./src/api.py --host 0.0.0.0 --port 8000
