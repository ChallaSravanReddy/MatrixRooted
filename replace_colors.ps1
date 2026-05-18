$files = Get-ChildItem -Path "c:\code\Matrixroot\app", "c:\code\Matrixroot\components" -Recurse -Include *.tsx, *.ts

foreach ($file in $files) {
    try {
        $content = [System.IO.File]::ReadAllText($file.FullName)
        
        $newContent = $content -replace '(?i)#F9F5F0', '#0d0d0d' `
                               -replace '(?i)#8B4513', '#00ffcc' `
                               -replace '(?i)#3D2B1F', '#ffffff' `
                               -replace '(?i)#D2B48C', '#00ffcc' `
                               -replace '(?i)#C1A37B', '#00e6b8' `
                               -replace 'bg-white', 'bg-[#141414]' `
                               -replace 'bg-black', 'bg-[#000000]'
                               
        if ($content -cne $newContent) {
            [System.IO.File]::WriteAllText($file.FullName, $newContent)
            Write-Host "Updated $($file.FullName)"
        }
    } catch {
        Write-Host "Error processing $($file.FullName): $_"
    }
}
