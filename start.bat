@echo off
title OnboardAI — AI Onboarding Guide Generator
color 0B
echo.
echo  ============================================
echo    🚀 OnboardAI — AI Onboarding Guide Generator
echo  ============================================
echo.

:: Check if node_modules exist, install if not
if not exist "%~dp0server\node_modules" (
    echo [1/4] Installing backend dependencies...
    cd /d "%~dp0server"
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ ERROR: Failed to install backend dependencies.
        pause
        exit /b 1
    )
    echo ✅ Backend dependencies installed.
    echo.
) else (
    echo [1/4] Backend dependencies already installed. ✅
)

if not exist "%~dp0client\node_modules" (
    echo [2/4] Installing frontend dependencies...
    cd /d "%~dp0client"
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ ERROR: Failed to install frontend dependencies.
        pause
        exit /b 1
    )
    echo ✅ Frontend dependencies installed.
    echo.
) else (
    echo [2/4] Frontend dependencies already installed. ✅
)

echo.
echo [3/4] Starting Backend Server (Port 5000)...
cd /d "%~dp0server"
start "OnboardAI-Backend" cmd /k "title OnboardAI Backend && node server.js"

:: Wait for backend to start
timeout /t 3 /nobreak >nul

echo [4/4] Starting Frontend Dev Server (Port 5173)...
cd /d "%~dp0client"
start "OnboardAI-Frontend" cmd /k "title OnboardAI Frontend && npm run dev"

:: Wait for frontend to start
timeout /t 5 /nobreak >nul

:: Open browser
echo.
echo  Opening browser...
start http://localhost:5173

echo.
echo  ============================================
echo    ✅ OnboardAI is running!
echo  ============================================
echo.
echo    Frontend : http://localhost:5173
echo    Backend  : http://localhost:5000
echo    API Docs : http://localhost:5000/api/health
echo.
echo    Press any key to close this launcher...
echo    (Servers will keep running in their windows)
echo.
pause >nul
