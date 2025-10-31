# Forest-Green Palette Migration Script
# Critical path color replacements for Glowheal healthcare platform
# Run from: D:\web\glowheal

Write-Host "`n🌲 FOREST-GREEN PALETTE MIGRATION" -ForegroundColor Green
Write-Host "================================`n" -ForegroundColor Green

# Target directories
$webApp = "apps\web\src\app"

# Color mapping rules (ordered by priority)
$colorReplacements = @(
    # Hero gradients
    @{
        Find = 'bg-gradient-navy-purple'
        Replace = 'bg-gradient-forest-jade'
        Description = 'Hero gradient backgrounds'
    },
    # Text colors - headings
    @{
        Find = 'text-navy-800'
        Replace = 'text-forest-700'
        Description = 'Heading text navy to forest'
    },
    @{
        Find = 'text-navy-900'
        Replace = 'text-forest-700'
        Description = 'Dark text navy to forest'
    },
    # Accent colors
    @{
        Find = 'text-purple-700'
        Replace = 'text-jade-600'
        Description = 'Accent text purple to jade'
    },
    @{
        Find = 'text-purple-100'
        Replace = 'text-jade-100'
        Description = 'Light text on dark purple to jade'
    },
    @{
        Find = 'text-purple-200'
        Replace = 'text-jade-200'
        Description = 'Light accent text'
    },
    @{
        Find = 'text-purple-300'
        Replace = 'text-jade-300'
        Description = 'Light accent text'
    },
    # Background colors
    @{
        Find = 'bg-purple-700'
        Replace = 'bg-jade-600'
        Description = 'Badge backgrounds purple to jade'
    },
    @{
        Find = 'bg-purple-50'
        Replace = 'bg-jade-50'
        Description = 'Light backgrounds purple to jade'
    },
    @{
        Find = 'bg-purple-100'
        Replace = 'bg-jade-100'
        Description = 'Light backgrounds purple to jade'
    },
    # Borders and hovers
    @{
        Find = 'border-purple-300'
        Replace = 'border-jade-300'
        Description = 'Border colors'
    },
    @{
        Find = 'hover:bg-purple-50'
        Replace = 'hover:bg-jade-50'
        Description = 'Hover backgrounds'
    },
    @{
        Find = 'hover:bg-purple-100'
        Replace = 'hover:bg-jade-100'
        Description = 'Hover backgrounds'
    },
    @{
        Find = 'hover:text-purple-700'
        Replace = 'hover:text-jade-600'
        Description = 'Hover text colors'
    },
    @{
        Find = 'hover:text-purple-800'
        Replace = 'hover:text-jade-700'
        Description = 'Hover text colors'
    },
    @{
        Find = 'hover:text-purple-900'
        Replace = 'hover:text-jade-800'
        Description = 'Hover text colors'
    },
    # Form elements
    @{
        Find = 'focus:ring-purple-500'
        Replace = 'focus:ring-forest-700'
        Description = 'Focus ring colors'
    },
    @{
        Find = 'focus:ring-purple-700'
        Replace = 'focus:ring-forest-700'
        Description = 'Focus ring colors'
    },
    # Navy replacements for misc elements
    @{
        Find = 'bg-navy-100'
        Replace = 'bg-jade-50'
        Description = 'Navy backgrounds to jade'
    },
    @{
        Find = 'bg-navy-900'
        Replace = 'bg-forest-900'
        Description = 'Dark backgrounds'
    }
)

# Backup warning
Write-Host "⚠️  IMPORTANT: Make sure you have committed recent changes!" -ForegroundColor Yellow
Write-Host "This script will modify multiple files in-place.`n" -ForegroundColor Yellow

$confirmation = Read-Host "Continue with migration? (y/N)"
if ($confirmation -ne 'y' -and $confirmation -ne 'Y') {
    Write-Host "Migration cancelled." -ForegroundColor Red
    exit
}

Write-Host "`n🔄 Starting migration...`n" -ForegroundColor Cyan

# Track statistics
$totalReplacements = 0
$filesModified = 0

# Get all TSX files in app directory
$files = Get-ChildItem -Path $webApp -Filter "*.tsx" -Recurse

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    $originalContent = $content
    $fileReplacements = 0
    
    foreach ($rule in $colorReplacements) {
        $count = ([regex]::Matches($content, [regex]::Escape($rule.Find))).Count
        if ($count -gt 0) {
            $content = $content -replace [regex]::Escape($rule.Find), $rule.Replace
            $fileReplacements += $count
        }
    }
    
    if ($fileReplacements -gt 0) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        $relativePath = $file.FullName.Replace((Get-Location).Path + "\", "")
        Write-Host "  ✓ $relativePath" -ForegroundColor Green -NoNewline
        Write-Host " ($fileReplacements replacements)" -ForegroundColor Gray
        $filesModified++
        $totalReplacements += $fileReplacements
    }
}

Write-Host "`n✅ MIGRATION COMPLETE!" -ForegroundColor Green
Write-Host "===================`n" -ForegroundColor Green
Write-Host "Files modified: " -NoNewline -ForegroundColor Cyan
Write-Host $filesModified -ForegroundColor White
Write-Host "Total replacements: " -NoNewline -ForegroundColor Cyan
Write-Host $totalReplacements -ForegroundColor White
Write-Host "`n📋 NEXT STEPS:" -ForegroundColor Cyan
Write-Host "1. Review changes: git diff" -ForegroundColor White
Write-Host "2. Test dev server: npm run dev" -ForegroundColor White
Write-Host "3. Run Lighthouse audits on Home, Services, Doctors" -ForegroundColor White
Write-Host "4. Test color contrast (Axe DevTools)" -ForegroundColor White
Write-Host "5. Verify color-blind simulation (Chrome DevTools > Rendering)" -ForegroundColor White
Write-Host "`nIf issues found, revert with: git restore apps/web/src/app/" -ForegroundColor Yellow
Write-Host ""
