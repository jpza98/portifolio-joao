@echo off
echo Iniciando servidor local...
echo.
echo O portfólio estará disponível em: http://localhost:8000
echo.
echo Pressione Ctrl+C para parar o servidor
echo.
python -m http.server 8000
if errorlevel 1 (
    echo Python nao encontrado. Tentando com Node.js...
    npx http-server -p 8000 -o
)
