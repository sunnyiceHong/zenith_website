# PR 1 Homepage Fix - 提交脚本
cd D:\workspace\html\zenith_website

git stash
git checkout feature/homepage-redesign
git stash pop
git add index.html styles.css script.js
git commit -m "fix: add carousel pagination, pause button, product subtitles"
git push origin feature/homepage-redesign

echo "=== 完成 ==="
git log --oneline feature/homepage-redesign -3
