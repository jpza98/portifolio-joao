Write-Host "Iniciando servidor local..." -ForegroundColor Green
Write-Host ""
Write-Host "O portfólio estará disponível em: http://localhost:8000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Pressione Ctrl+C para parar o servidor" -ForegroundColor Yellow
Write-Host ""

npx --yes http-server -p 8000 -c-1 -o
