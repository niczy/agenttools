#!/bin/bash

while true; do
  # Kill processes listening on ports 3000 and 3001
  for port in 3000 3001; do
    PID=$(lsof -t -i tcp:$port)
    if [ -n "$PID" ]; then
      kill -9 $PID
    fi
  done

  # Step 1: Run git pull
  git pull

  # Step 2: Run pnpm build
  cd app
  pnpm install
  pnpm dev &
  APP_SERVER_PID=$!
  cd ..

  cd server
  uv sync
  source .venv/bin/activate
  python server.py --tools_path /home/nic/workspace/data/agenttools/tools &
  API_SERVER_PID=$!
  cd ..

  # Step 4: Wait 10 minutes
  sleep 10

  echo "App Server PID: $APP_SERVER_PID"
  echo "API Server PID: $API_SERVER_PID"

  # Step 5: Kill the process from step #3
  kill $APP_SERVER_PID -9
  kill $API_SERVER_PID -9
done
