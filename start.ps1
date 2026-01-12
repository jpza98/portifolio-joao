Write-Host "Iniciando servidor local..." -ForegroundColor Green
Write-Host ""
Write-Host "O portfólio estará disponível em: http://localhost:8000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Pressione Ctrl+C para parar o servidor" -ForegroundColor Yellow
Write-Host ""

try {
    python -m http.server 8000
} catch {
    Write-Host "Python não encontrado. Tentando com Node.js..." -ForegroundColor Yellow
    npx http-server -p 8000 -o
}


