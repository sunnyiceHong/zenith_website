Write-Host '===== 1. PR 1 Homepage ====='
git stash
git checkout feature/homepage-redesign
git stash pop
git add index.html styles.css script.js
git commit -m "fix: add carousel pagination, pause button, product subtitles"
git push origin feature/homepage-redesign
Write-Host 'PR 1 pushed. 请创建 PR 并 merge'

Write-Host '===== 2. PR 2 Footer ====='
git checkout main
git stash
git checkout feature/footer-redesign
git stash pop
git add index.html shared.css
git commit -m "fix: add social icons, privacy/terms column, legal text"
git push origin feature/footer-redesign
Write-Host 'PR 2 pushed'

Write-Host '===== 3. PR 3 Collection Pages ====='
git checkout main
git stash
git checkout feature/collection-pages
git stash pop
git add collection.css collections/
git commit -m "fix: add recently viewed, view toggle, SEO description"
git push origin feature/collection-pages
Write-Host 'PR 3 pushed'

Write-Host '===== 4. Cart ====='
git checkout main
git stash
git add cart.js cart.html
git commit -m "fix: cart JS item tracking, add footer"
git push origin main
Write-Host 'OK'

Write-Host ''
Write-Host '===== 全部完成! ====='
Write-Host '请按顺序 merge PR:'
Write-Host '  1. feature/homepage-redesign'
Write-Host '  2. feature/footer-redesign'
Write-Host '  3. feature/collection-pages'
Write-Host '  (product-detail + cart 已在 main 上)'