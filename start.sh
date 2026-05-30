#!/bin/bash
# Start backend on port 3001
node server.js &

# Wait for backend to start
sleep 2

# Start frontend on port 5000 (disable interactive prompts and browser auto-open)
cd client && BROWSER=none PORT=5000 HOST=0.0.0.0 DANGEROUSLY_DISABLE_HOST_CHECK=true npm start
