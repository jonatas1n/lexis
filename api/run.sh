#!/bin/bash

pip install -r requirements.txt
fastapi dev ./src/api.py
