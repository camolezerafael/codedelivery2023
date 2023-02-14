#!/bin/bash

if [ ! -f ".env" ]; then
  cp .env.example .env
fi

npm install

npm start --host 0.0.0.0 --port 3001 --disableHostCheck true