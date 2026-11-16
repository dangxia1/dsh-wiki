@echo off
rem ============================================================
rem  双击启动跑者生理学 wiki（本机预览）
rem  做法：把 npm 缓存 / 假 HOME / 临时目录都重定向进 wiki\
rem        （同 app\ 的做法，避免往 C:\Users 写），再起 dev server
rem ============================================================
setlocal
set "WIKI_ROOT=%~dp0"
set "npm_config_cache=%WIKI_ROOT%.cache\npm-cache"
set "HOME=%WIKI_ROOT%.home"
set "USERPROFILE=%WIKI_ROOT%.home"
set "TEMP=%WIKI_ROOT%.tmp"
set "TMP=%WIKI_ROOT%.tmp"

if not exist "%WIKI_ROOT%.cache\npm-cache" mkdir "%WIKI_ROOT%.cache\npm-cache"
if not exist "%WIKI_ROOT%.home" mkdir "%WIKI_ROOT%.home"
if not exist "%WIKI_ROOT%.tmp" mkdir "%WIKI_ROOT%.tmp"

rem 6 秒后自动打开浏览器（base 为 /dsh-wiki/，见 config.ts）
start "" cmd /c "timeout /t 6 /nobreak >nul & start http://localhost:5173/dsh-wiki/"

cd /d "%WIKI_ROOT%"
npx vitepress dev docs --port 5173
pause
