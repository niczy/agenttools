#!/bin/bash

while true; do
  # Kill processes listening on ports 3000 and 3001
  for port in 3000 3001; do
    PID=$(lsof -t -i tcp:$port)
    if [ -n "$PID" ]; then
      kill -9 $PID
      # Wait for process to be killed
      sleep 1
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
  sleep 600

  echo "App Server PID: $APP_SERVER_PID"
  echo "API Server PID: $API_SERVER_PID"

  # Step 5: Kill the processes
  if ps -p $APP_SERVER_PID > /dev/null; then
    kill -9 $APP_SERVER_PID
  fi
  
  if ps -p $API_SERVER_PID > /dev/null; then
    kill -9 $API_SERVER_PID
  fi
done
