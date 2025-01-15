#!/bin/bash

while true; do
  # Kill process listening on port 3000
  PID_3000=$(lsof -t -i tcp:3000)
  if [ -n "$PID_3000" ]; then
    kill -9 $PID_3000
  fi

  # Kill process listening on port 3001
  PID_3001=$(lsof -t -i tcp:3001)
  if [ -n "$PID_3001" ]; then
    kill -9 $PID_3001
  fi

  # Step 1: Run git pull
  git pull

  # Step 2: Run pnpm build
  cd app
  pnpm install
  pnpm build
  # Step 3: Run pnpm start in a separate process
  pnpm start &
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

  # Step 5: Kill the process from step #3
  kill $APP_SERVER_PID
  kill $API_SERVER_PID
done
