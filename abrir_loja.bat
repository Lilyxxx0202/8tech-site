@echo off
chcp 65001 >nul
title 8º Tech - Tudo por R$5
echo ===================================================
echo         Abrindo 8º Tech - Tudo por R$5
echo ===================================================
echo.

set "HTML_FILE=%~dp0index.html"

:: 1. Tenta abrir diretamente no Google Chrome (64-bit)
if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    echo [OK] Abrindo no Google Chrome...
    start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" "%HTML_FILE%"
    goto fim
)

:: 2. Tenta abrir no Google Chrome (32-bit)
if exist "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" (
    echo [OK] Abrindo no Google Chrome...
    start "" "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" "%HTML_FILE%"
    goto fim
)

:: 3. Tenta abrir no Microsoft Edge
if exist "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" (
    echo [OK] Abrindo no Microsoft Edge...
    start "" "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" "%HTML_FILE%"
    goto fim
)

:: 4. Fallback padrao do Windows
start "" "%HTML_FILE%"

:fim
echo.
echo Loja aberta com sucesso no navegador!
echo Caso deseje abrir manualmente, copie e cole este link no seu Chrome ou Edge:
echo %HTML_FILE%
echo.
timeout /t 3 >nul
exit
