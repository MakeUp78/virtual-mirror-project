@echo off
echo Installing dependencies...

cd backend
if not exist node_modules (
    echo Installing backend dependencies...
    call npm install
)

cd ..\frontend
if not exist node_modules (
    echo Installing frontend dependencies...
    call npm install
)

cd ..

if not exist backend\.env (
    echo Creating .env file...
    copy backend\.env.example backend\.env
)

echo.
echo Starting servers...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.

start cmd /k "cd backend && npm run dev"
timeout /t 3
start cmd /k "cd frontend && npm start"

echo.
echo Servers are starting...
echo Frontend will open automatically in your browser
echo Press Ctrl+C in each terminal window to stop the servers
