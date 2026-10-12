@echo off
echo Iniciando servidor local...
echo.
echo O portfolio estara disponivel em: http://localhost:8000
echo.
echo Pressione Ctrl+C para parar o servidor
echo.
npx --yes http-server -p 8000 -c-1 -o
