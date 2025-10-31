# Forest-Green Palette Migration Script
# Run from: D:\web\glowheal

Write-Host "Forest-Green Palette Migration Starting..." -ForegroundColor Green

$webApp = "apps\web\src\app"
$totalReplacements = 0
$filesModified = 0

$files = Get-ChildItem -Path $webApp -Filter "*.tsx" -Recurse

foreach ($file in $files) {
    $content = (Get-Content -Path $file.FullName) -join "`n"
    $originalContent = $content
    
    # Hero gradients
    $content = $content -replace 'bg-gradient-navy-purple', 'bg-gradient-forest-jade'
    
    # Text colors
    $content = $content -replace 'text-navy-800', 'text-forest-700'
    $content = $content -replace 'text-navy-900', 'text-forest-700'
    $content = $content -replace 'text-purple-700', 'text-jade-600'
    $content = $content -replace 'text-purple-100', 'text-jade-100'
    $content = $content -replace 'text-purple-200', 'text-jade-200'
    $content = $content -replace 'text-purple-300', 'text-jade-300'
    
    # Backgrounds
    $content = $content -replace 'bg-purple-700', 'bg-jade-600'
    $content = $content -replace 'bg-purple-50', 'bg-jade-50'
    $content = $content -replace 'bg-purple-100', 'bg-jade-100'
    $content = $content -replace 'bg-navy-100', 'bg-jade-50'
    $content = $content -replace 'bg-navy-900', 'bg-forest-900'
    
    # Borders
    $content = $content -replace 'border-purple-300', 'border-jade-300'
    
    # Hovers
    $content = $content -replace 'hover:bg-purple-50', 'hover:bg-jade-50'
    $content = $content -replace 'hover:bg-purple-100', 'hover:bg-jade-100'
    $content = $content -replace 'hover:text-purple-700', 'hover:text-jade-600'
    $content = $content -replace 'hover:text-purple-800', 'hover:text-jade-700'
    $content = $content -replace 'hover:text-purple-900', 'hover:text-jade-800'
    
    # Focus rings
    $content = $content -replace 'focus:ring-purple-500', 'focus:ring-forest-700'
    $content = $content -replace 'focus:ring-purple-700', 'focus:ring-forest-700'
    
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        $relativePath = $file.FullName.Replace((Get-Location).Path + "\", "")
        Write-Host "Modified: $relativePath" -ForegroundColor Cyan
        $filesModified++
    }
}

Write-Host "`nMigration complete!" -ForegroundColor Green
Write-Host "Files modified: $filesModified" -ForegroundColor White
Write-Host "`nNext: Test with 'npm run dev'" -ForegroundColor Yellow
